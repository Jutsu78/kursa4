
const logger = require('./logger');

// callback
function asyncFilterCallback(array, asyncPredicate, finalCallback, signal) {
    const results = [];
    let currentIndex = 0;

    function processNext() {
        if (signal && signal.aborted) {
            const err = new Error(" [Callback] Operation cancelled");
            logger.warn({ currentIndex }, "Process stopped with abortcontroller");
            return finalCallback(err,);
        }
        if (currentIndex >= array.length) {
            return finalCallback(null, results);
        }

        const item = array[currentIndex];

        asyncPredicate(item, (err, result) => {
            if (err) {
                logger.error({ error: err.message, txid: item.id }, "Error during checking item");

                return finalCallback(err);
            }
            if (result) {
                results.push(item);
            }

            currentIndex++;
            processNext();
        });
    }

    processNext();
}


// promises

function asyncFilterPromise(array, asyncPredicatePromise, signal) {
    return new Promise(async (resolve, reject) => {
        try {
            const results = [];

            for (const item of array) {
                if (signal && signal.aborted) {
                    const err = new Error(" [Promise] Operation Cancelled");
                    logger.warn("Process Promise stopped with abortcontroller");
                    return reject(err);
                }
                const IsaMatch = await asyncPredicatePromise(item);
                if (IsaMatch) {
                    results.push(item);
                }
            }
            resolve(results);
        } catch (err) {
            logger.error({ error: err.message }, "fatal error in promise");
            reject(err);
        }
    });
}

// demo
if (require.main === module) {
const transactions = [
    { id: 1, amount: 100, currency: 'UAH' },
    { id: 2, amount: 2000, currency: 'USD' },
    { id: 3, amount: 5000, currency: 'GBP' }
];

const checkCb = (tx, cb) => setTimeout(() => cb(null, tx.amount > 1500), 500);
const checkPr = (tx) => new Promise((res) => setTimeout(() => res(tx.amount > 1500), 500));
logger.info("starting checking...");

asyncFilterCallback(transactions, checkCb, (err, res) => {
    if (err) logger.error({ err: err.message }, "Callback error");
    else logger.info({ results: res }, "Callback success");
});

asyncFilterPromise(transactions, checkPr)
    .then(res => logger.info({ results: res }, "Promise success"))
    .catch(err => logger.error({ err: err.message }, "Promise error"));

const controller = new AbortController();
setTimeout(() => controller.abort(), 100);

asyncFilterPromise(transactions, checkPr, controller.signal)
    .then(() => logger.info("This shouldn't be logged"))
    .catch(err => logger.warn({ err: err.message }, "AbortController test successfully stopped the promise"));
}
    module.exports = { asyncFilterPromise };