
class priorityQueue {
constructor() {
this.vipQueue = [];
this.regularQueue = [];
}

enqueue(transaction) {
if (transaction.amount > 1000) 
this.vipQueue.push(transaction);
 else this.regularQueue.push(transaction);
}
}