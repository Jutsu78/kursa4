const logger = require('./logger');

async function* transactionStream(totalRecords) {
    logger.info({ total: totalRecords }, "Stream started");

    for (let i = 1; i <= totalRecords; i++) {
        await new Promise(res => setTimeout(res, 100));

        if (i === 5) {
            const err = new Error(`corrupted data at index ${i}`);
            logger.error({index : i }, "producer error (throwing)");
            throw err;
        }
    }
}