
function withLogging({level = 'INFO', transport}) {
    return function decorator(targetFunction) {
        return function (...args) {
            const StartTime =  Date.now();
            const timestamp = new Date().toISOString();

            const createLogEntry = (statusLevel, resultOrError, isError = false) => {
                const duration = Date.now() - StartTime;
                const entry = {
                    timestamp,
                    level: statusLevel,
                    functionName: targetFunction.name, || 'anonymous',
                    args,
                    durationMs: duration,