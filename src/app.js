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
