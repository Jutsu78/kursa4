
class BankApiService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    async syncTransactions(tx) {
        return await this.httpClient.request('https://api.external-bank.com/v1/sync', { // fake api for demo
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tx)
        });
    }

}

module.exports = BankApiService;