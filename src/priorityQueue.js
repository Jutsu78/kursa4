
class priorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(item, priority) {
        const element = { item, priority};
        let added = false;

        for (let i = 0; i < this.queue.length; i++) {
            if (element.priority < this.queue[i].priority) {
                this.queue.splice(i, 0, element);
                added = true;
                break;
            }
        }
    

    }
}