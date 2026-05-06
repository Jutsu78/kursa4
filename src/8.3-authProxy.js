
class AuthProxy {
    constructor(innerClient, authStrategy) {
        this.innerClient = innerClient;
        this.authStrategy = authStrategy;
    }

    async request(url, options = {}) {
        let authOptions = await this.authStrategy.apply(options);
        let response = await this.innerClient.request(url, authOptions);

        if (response.status === 401 && typeof this.authStrategy.refresh === 'function') {
            await this.authStrategy.refresh();
            authOptions = await this.authStrategy.apply(options);
            response = await this.innerClient.request(url, authOptions);
        }

        return response;
    }
}

module.exports = AuthProxy;