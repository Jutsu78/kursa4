
const logger = require('./logger');

// callback
function asyncFilterCallback (array, asyncPredicate, finalCallback, signal) {
    const results = [];
    let currentIndex = 0;

    function processNext() {
        if (signal && signal.aborted) {
            const err = new Error(" [Callback] Operation cancelled");
            logger.warn({ currentIndex}, "Process stopped with abortcontroller");
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
