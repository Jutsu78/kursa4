const logger = require('./logger');

class LoggingProxy {
    constructor(innerClient) {
        this.innerClient = innerClient;
    }

    async request(url, options = {}) {
        logger.info({ url, method: options.method || 'GET' }, 'Outgoing API request');
        const startTime = Date.now();