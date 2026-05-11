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
        if (!this.events.has(eventName) || this.events.get(eventName).length === 0) {
            if (eventName !== 'error') {
                logger.warn({ eventName }, 'Emitting event with no listeners');
            }
            return;
        }

        const listeners = [...this.events.get(eventName)];

        for (const listener of listeners) {
            try {
                listener(payload);
            } catch (err) {
                if (eventName !== 'error') {
                    this.emit('error', { originalError: eventName, error: err.message });
                } else {
                    logger.error({ err: err.message }, 'Fatal error in error channel');
                }
            }
        }
    }
}
if (require.main === module) {
const emitter = new ReactiveEmitter();

emitter.subscribe('error', (err) => {
    logger.error({ err }, 'Error event emitted');
});

const unsub1 = emitter.subscribe('transaction', (tx) => {
    logger.info({ id: tx.id }, 'listener 1 received transaction');
});

emitter.subscribe('transaction', (tx) => {
    if (tx.amount > 1000) {
        throw new Error('simulated listener crash');
    }
    logger.info({ id: tx.id }, 'listener 2 received transaction');
});

emitter.subscribe('transaction', (tx) => {
    logger.info({ id: tx.id }, 'listener 3 received transaction');
});

emitter.emit('unknownEvent', { data: 123 });
emitter.emit('transaction', { id: 1, amount: 500 });
emitter.emit('transaction', { id: 2, amount: 2000 });

unsub1();
emitter.emit('transaction', { id: 3, amount: 300 });
}
module.exports = ReactiveEmitter;