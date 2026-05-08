const ConsoleJsonTransport = require('./9.1-loggerTransport');
const withLogging = require('./9.2-logDecorator');

const transport = new ConsoleJsonTransport();

const logInfo = withLogging({ level: 'INFO', transport });
const logErrorOnly = withLogging({ level: 'ERROR', transport });

function syncMathOperation(a, b) {
    return a + b;
}

function syncFailingOperation() {
    throw new Error('Sync core dump');
}

async function asyncFetchData(id) {
    return new Promise(resolve => setTimeout(() => resolve({ id, status: 'fetched' }), 100));
}

async function asyncFailingFetch() {
    return new Promise((_, reject) => setTimeout(() => reject(new Error('Network timeout')), 50));
}

const decoratedSyncMath = logInfo(syncMathOperation);
const decoratedSyncFail = logErrorOnly(syncFailingOperation);
const decoratedAsyncFetch = logInfo(asyncFetchData);
const decoratedAsyncFailErrorOnly = logErrorOnly(asyncFailingFetch);

async function runDemo() {
    decoratedSyncMath(5, 10);

    try {
        decoratedSyncFail();
    } catch (err) { }
    await decoratedAsyncFetch(42);

    try {
        await decoratedAsyncFailErrorOnly();
    } catch (err) { }
}

runDemo();