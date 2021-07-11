/*(function(exports, require, module, __filename, __dirname) {
    //Module code actually lives in here
});
*/
const EventEmitter = require('events')

class Logger extends EventEmitter {

    constructor() {
        super();
    }
    
    log(message) {
        console.log(message);
        this.emit('message', {id: 1, url: 'google.com'});
    }
}

module.exports = Logger;