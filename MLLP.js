const net = require('net');
var EventEmitter = require('events').EventEmitter;

class MLLPServer extends EventEmitter {
    constructor(host, port, options) {
        super()
        const VT = String.fromCharCode(0x0b);
        const FS = String.fromCharCode(0x1c);
        const CR = String.fromCharCode(0x0d);

        this.header = VT;
        this.trailer = FS + CR;

        if (options) {
            this.header = options.header || this.header;
            this.trailer = options.trailer || this.trailer;
        }

        this.host = host || '127.0.0.1';
        this.port = port || 6000;
        this.message = '';
        this.server = net.createServer(socket => {
            socket.on('data', data => {
                data = data.toString();

                // Check for the start of the MLLP message
                data.indexOf(this.header);

                if (data.indexOf(this.header) > -1) {
                    this.message = ''; // Reset the message
                    data = data.replace(this.header, '')
                }
                // Append the data to the message
                this.message += data;

                // Check for closing tags
                if (data.indexOf(this.trailer) > -1) {
                    this.message = this.message.replace(this.trailer, ''); // Remove the trailer

                    // Emit the Data after the trailer
                    // Push the message into the Event Loop
                    // Offload the responsibility of creating an ACK 
                    this.emit('mllp', { data: this.message, socket: socket });
                }
            })
        })
    }

    start() {
        this.server.listen(this.port, this.host);
    }

    stop() {
        this.server.close();
    }

    send(host, port, data, callback) {
        let sendingClient = new net.connect({
            host: host,
            port: port
        }, () => {
            sendingClient.write(this.header + data + this.trailer);
        });

        sendingClient.on('data', ack => {
            ack = ack.toString().replace(this.header, '').replace(this.trailer, '')
            callback(null, ack); // Offload responsibility of parsing ACK
            sendingClient.end();
        })

        sendingClient.on('error', error => {
            callback(error, null);
            sendingClient.end();
        })
    }
}

exports.MLLPServer = MLLPServer;