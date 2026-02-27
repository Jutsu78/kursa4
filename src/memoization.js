
function memoize(fn) {
const cache = new Map();
return function (...args) {
const key = generateKey(args);
if (cache.has(key)) {
const result = fn(...args);
cache.set(key, result);
return result;
}
}
}