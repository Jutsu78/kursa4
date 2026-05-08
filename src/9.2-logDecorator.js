
function withLogging({ level = 'INFO', transport }) {
    return function decorator(targetFunction) {
        return function (...args) {
            const StartTime = Date.now();
            const timestamp = new Date().toISOString();

            const createLogEntry = (statusLevel, resultOrError, isError = false) => {
                const duration = Date.now() - StartTime;
                const entry = {
                    timestamp,
                    level: statusLevel,
                    functionName: targetFunction.name, || 'anonymous',
                    args,
                    durationMs: duration,
            };
            if (isError) {
                entry.error = resultOrError.message;
            } else {
                entry.result = resultOrError;
            }

            return entry;
        };

        try {
            const result = targetFunction(...args);

            if (result && typeof result.then === 'function') {
                return result.then(resolvedValue => {
                    if (level !== 'ERROR') {
                        transport.write(createLogEntry(level, resolvedValue));
                    }
                    return resolvedValue;
                })
                    .catch(err => {
                        transport.write(createLogEntry('ERROR', err, true));
                        throw err;
                    });
            }