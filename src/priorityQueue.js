
class priorityQueue {
    constructor() {
        this.vipQueue = [];
        this.regularQueue = [];
    }

    enqueue(transaction) {
        if (transaction.amount > 1000) {
            this.vipQueue.push(transaction);
        } else {
            this.regularQueue.push(transaction);
        }
    }
    dequeue() {
        if (this.vipQueue.length > 0) {
            return this.vipQueue.shift();
        } else if (this.regularQueue.length > 0) {
            return this.regularQueue.shift();
        }

        console.log("Queue is empty");
    }
}

module.exports = priorityQueue;