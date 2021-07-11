const path = require('path')
const os = require('os')
const fs = require('fs')
const http = require('http')

const Logger = require('./logger')
const logger = new Logger();

// used to bind events and listeners
const EventEmitter = require('events')
const emitter = new EventEmitter();

sayHi = function() {
    console.log('Hi Ed');
}

const sayBye = () => {
    console.log('Bye Ed');
};

function sayHello(name) {
    console.log('Hello ' + name);
    //console.log(module);
    //console.log(logger);
    console.log(__filename);
    console.log(__dirname);

    var pathObj = path.parse(__filename);
    console.log(pathObj);

    var totalMemory = os.totalmem();
    console.log(`Total Memory: ${totalMemory}`);

    const files = fs.readdirSync('./');
    console.log(files);

    // node monitors event queue, non blocking call
    fs.readdir('./',function(err,files) {
        if (err) console.log('Error', err);
        else console.log('Result', files);
    });

    fs.writeFile('message.txt', 'Welcome BMC', (err) => {
        if(err) throw err;
    });
    fs.readFile('./message.txt', 'utf8', (err,data) => {
        if(err) throw err;
        console.log(data);
    });

    // register a listener
    emitter.on('High CPU', (arg) => {
        console.log('CPU Listener called', arg);
    });
    logger.on('message', (arg) => {
        console.log('Log Listener called', arg);
    });
    
    // raise an event
    emitter.emit('High CPU', {id: 1, percentage: '95.9%'});
    logger.log("Successful");

    const server = http.createServer((req, res) => {
         
        if(req.url === '/') {
            fs.readFile(path.join(__dirname,'./public/index.html'),
                (err,data) => {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.write(data);
                    res.end();
                }
            );
        }
        
        if(req.url === '/api/courses') {
            res.write(JSON.stringify(['C', 'C++']));
            res.end();
        }
    });

    /*server.on('connection', (socket) => {
        console.log('New connection...');
    });*/
    server.listen(3000);
    console.log('Listening on port 3000...');

}

sayHello('Anil Jesrani');
sayHi();
sayBye();
