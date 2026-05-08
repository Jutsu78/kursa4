
class ConsoleJsonTransport {
    write(entry) {
        console.log(JSON.stringify(entry, null, 2));
    }
}

module.exports = ConsoleJsonTransport;