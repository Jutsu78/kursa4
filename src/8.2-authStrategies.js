
class ApiKeyStrategy {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async apply(options) {
        const headers = options.headers || {};
        headers['x-api-key'] = this.apiKey;
        return { ...options, headers };
    }
}

class JwtStrategy {
    constructor(tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    async apply(options) {
        const token = await this.tokenProvider.getToken();
        const headers = options.headers || {};
        headers['Authorization'] = `Bearer ${token}`;
        return { ...options, headers };
    }

    async refresh() {
        await this.tokenProvider.refreshToken();
    }
}

module.exports = { ApiKeyStrategy, JwtStrategy };