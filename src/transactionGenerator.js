
function* generateTransactions() { 
    const transition = Math.random() 
    amount = Math.floor(Math.random() * 1000) + 1
    currency = ['USD', 'EUR', 'UAH', 'BTC'][Math.floor(Math.random() * 4)]
    yield { transition, amount, currency}
};

