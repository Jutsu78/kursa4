
class BaseHttpClient {
    async request(url, options = {}) {
        return await fetch(url, options);
    }
}

module.exports = BaseHttpClient;