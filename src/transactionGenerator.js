
const memoizedConvert = require('./memoization');
const priorityQueue = require('./priorityQueue');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* generateTransactions() { 
    while (true) {
    const transaction = Math.random() 
  const amount = Math.floor(Math.random() * 2000) + 1
    const currency = ['USD', 'EUR', 'UAH', 'BTC'][Math.floor(Math.random() * 4)]
    yield { transaction, amount, currency}

    await delay(1000)
}

}



async function StartSystem() {
   const liveTransactions = generateTransactions()
   const queue = new priorityQueue();
   let tick = 0;

    for await (const transaction of liveTransactions) {
      const amountInUAH = memoizedConvert(transaction.amount, transaction.currency);
        console.log('New transaction:', transaction, 'Amount in UAH:', amountInUAH)
     
        queue.enqueue(transaction);
      console.log('added in queue:', transaction.amount, transaction.currency)
      tick++;
      if (tick % 2 === 0) {
       const processedTransaction = queue.dequeue();
       console.log('Processed transaction:', processedTransaction.amount, processedTransaction.currency);
      }
    
    }
  }

StartSystem();