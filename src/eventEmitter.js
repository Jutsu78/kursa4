const logger = require('./logger');

class ReactiveEmitter {
    constructor() {
        this.events = new Map();
    }

    subscribe(eventName, listener) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push(listener);

        return () => this.unsubscribe(eventName, listener);
    }

    unsubscribe(eventName, listener) {
        if (!this.events.has(eventName)) return;
        const listeners = this.events.get(eventName).filter(l => l !== listener);
        this.events.set(eventName, listeners);
    }
}
