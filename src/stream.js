const logger = require('./logger');

async function* transactionStream(totalRecords) {
    logger.info({ total: totalRecords }, "Stream started");

    for (let i = 1; i <= totalRecords; i++) {
        await new Promise(res => setTimeout(res, 100));

        if (i === 5) {
            const err = new Error(`corrupted data at index ${i}`);
            logger.error({ index: i }, "producer error (throwing)");
            throw err;
        }

        yield {
            id: `TXN-${i}`,
            amount: Math.floor(Math.random() * 5000) + 100,
            currency: i % 2 === 0 ? 'USD' : 'EUR',
            timestamp: new Date().toISOString()
        };
    }
    logger.info({ total: totalRecords }, "Stream finished");
}

async function processStream() {
    logger.info("consumer started");
    let count = 0;
    try {
        for await (const tx of transactionStream(10)) {
            logger.info({ transactionId: tx.id }, "Processed");
            count++;
        }

        logger.info({ count }, "consumer finished");
}   catch (err) {
    logger.error({ error: err.message }, "consumer error (caught)");
    }
}

processStream();