const logger = require('./logger');

class LoggingProxy {
    constructor(innerClient) {
        this.innerClient = innerClient;
    }

    async request(url, options = {}) {
        logger.info({ url, method: options.method || 'GET' }, 'Outgoing API request');
        const startTime = Date.now();

        const response = await this.innerClient.request(url, options);

        const duration = Date.now() - startTime;
        logger.info({ status: response.status, duration }, 'API request completed');
        return response;

    }
}

module.exports = LoggingProxy;