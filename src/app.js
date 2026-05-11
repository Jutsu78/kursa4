const logger = require('./logger');
const { transactionStream } = require('./stream');
const { asyncFilterPromise } = require('./filter');
const priorityQueue = require('./priorityQueue');
const memoizedConvert = require('./memoization');
const ReactiveEmitter = require('./eventEmitter');

const BaseHttpClient = require('./8.1-baseClient');
const { JwtStrategy } = require('./8.2-authStrategies');
const AuthProxy = require('./8.3-authProxy');
const LoggingProxy = require('./8.4-loggingProxy');
const BankApiService = require('./8.5-bankApiService');
const ConsoleJsonTransport = require('./9.1-loggerTransport');
const withLogging = require('./9.2-logDecorator');


const transport = new ConsoleJsonTransport();
const logInfo = withLogging({ level: 'INFO', transport });
const logError = withLogging({ level: 'ERROR', transport });

const dummyTokenProvider = {
    getToken: async () => 'active_system_token_999',
    refreshToken: async () => {
        logger.info('token refreshed for API integration');
    }
};

const bankService = new BankApiService(
    new LoggingProxy(
        new AuthProxy(new BaseHttpClient(), new JwtStrategy(dummyTokenProvider)),

    )
);
const queue = new priorityQueue();
const emitter = new ReactiveEmitter();

emitter.subscribe('transaction_synced', (tx) => {
    logger.info({ txId: tx.id, amountUAH: tx.amountInUAH }, '[MONITOR]  transaction has been successfully processed by the bank');
});

emitter.subscribe('error', (err) => {
    logger.error({ error: err.message }, '[ALARM] critical error in monitoring system');
});

const safeSyncWithBank = logError(async (tx) => {
    await bankService.syncTransactions(tx);
    emitter.emit('transaction_synced', tx);
});

const runFinancialSystem = logInfo(async () => {
    logger.info('starting financial system');

    try {

        const rawTransactions = [];
        for await (const tx of transactionStream(4)) {
            rawTransactions.push(tx);
        }

        const significantTx = await asyncFilterPromise(rawTransactions, async (tx) => tx.amount > 1000);
        logger.info({ filteredCount: significantTx.length, totalCount: rawTransactions.length }, 'Filtered significant transactions');


        for (const tx of significantTx) {
            queue.enqueue(tx, tx.amount);
        }

        while (queue.queue.length > 0) {
            const txToProcess = queue.dequeue();


            const amountInUAH = memoizedConvert(txToProcess.amount, txToProcess.currency);
            txToProcess.amountInUAH = amountInUAH;

            await safeSyncWithBank(txToProcess);
        }
    }