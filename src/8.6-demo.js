const BaseHttpClient = require('./8.1-baseClient');
const AuthProxy = require('./8.3-authProxy');
const LoggingProxy = require('./8.4-loggingProxy');
const { JwtStrategy } = require('./8.2-authStrategies');
const BankApiService = require('./8.5-bankApiService');

const  dummyTokenProvider = {
    getToken: async () => process.env.ACCESS_TOKEN ||  "expired_token_123",
    refreshToken: async () => {
        console.log('Refreshing token...');
        process.env.ACCESS_TOKEN = 'new_fresh_token_456';
    }
};