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
    }
}
        