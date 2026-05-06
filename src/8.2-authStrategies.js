
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