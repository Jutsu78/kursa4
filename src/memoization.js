
function memoize(fn) {
const cache = new Map();
return function (...args) {
const key = JSON.stringify(args);
if (cache.has(key)) {
return cache.get(key);
}
const result = fn(...args);
cache.set(key, result);
return result;
}
}


const exchangeRates = {USD: 41.5, EUR: 45.2, BTC: 3500000, UAH: 1};
function convertor(amount, currency) {
console.log('Calculating...', amount, currency);
currency = exchangeRates[currency];
return amount * currency;
}

const memoizedConvert = memoize(convertor);
module.exports = memoizedConvert;