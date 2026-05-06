
class AuthProxy {
    constructor(innerClient, authStrategy) {
        this.innerClient = innerClient;
        this.authStrategy = authStrategy;
    }

    async request(url, options = {}) {
        let authOptions = await this.authStrategy.apply(options);
        let response = await this.innerClient.request(url, authOptions);