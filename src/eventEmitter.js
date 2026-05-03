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


    emit(eventName, payload) {
        if (!this.events.has (eventName) || this.events.get(eventName).length === 0) {
            if (eventName !== 'error') {
                logger.warn({ eventName}, 'Emitting event with no listeners');
            }
            return;
        }

        const listeners = [...this.events.get(eventName)];

        for (const listener of listeners) {
            try {
                listener(payload);
            } catch (err) {
                if (eventName !== 'error') {
                    this.emit('error', {originalError: eventName, error: err.message});
            } else {
                    logger.error({err: err.message }, 'Fatal error in error channel');
                }
            }
        }
    }
}