
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* generateTransactions() { 
    while (true) {
    const transaction = Math.random() 
  const amount = Math.floor(Math.random() * 1000) + 1
    const currency = ['USD', 'EUR', 'UAH', 'BTC'][Math.floor(Math.random() * 4)]
    yield { transaction, amount, currency}

    await delay(1000)
}

}



async function StartSystem() {
   const liveTransactions = generateTransactions()
    for await (const transaction of liveTransactions) {
        console.log('New transaction:', transaction)
    }
  }

StartSystem();