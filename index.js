const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/routes/routes");
const http = require("http");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


const URL_VERSION = "/api/v1";
const URL_EXTENSION = "/users";
const URL = URL_VERSION + URL_EXTENSION;

app.use(URL, routes);

function normalizePort(val) {
    const port = parseInt(val, 10);
    //Check if the provided val is a number
    if (isNaN(port)) return val;
    //Ensure the port is greater than 0
    if (port > 0) return port;

    return false;
}

//create the new port
const port = normalizePort(process.env.PORT || "4000");

app.set("port", port);

const server = http.createServer(app);

//Handling errors
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.log(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

//Event listener
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
};

//Listen on provided port
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);