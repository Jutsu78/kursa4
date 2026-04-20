const logger = require('./logger');
function memoize(fn) {
    const maxSize = 5;
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            const value = cache.get(key);
            cache.delete(key);
            cache.set(key, value);
            return value;
        }
        const result = fn(...args);

        if (cache.size >= maxSize) {
            const oldekey = cache.keys().next().value;
            cache.delete(oldekey);
            logger.warn({ oldekey }, 'Cache Eviction');
        }

       logger.info({ args }, 'Caching transaction');


        cache.set(key, result);
        return result;
    }
}

const exchangeRates = { USD: 41.5, EUR: 45.2, BTC: 3500000, UAH: 1 };
function convertor(amount, currency) {
    logger.info({ amount, currency }, 'Calculating...');
    currency = exchangeRates[currency];
    return amount * currency;
}

const memoizedConvert = memoize(convertor);
module.exports = memoizedConvert;