import mongoose, { ConnectOptions } from 'mongoose';
import routes from "./routes/index";

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const Port = 9099 || 9097 || 9076;
const app = express();

app.use(cors({
    Credential:true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// server configration
const server= http.createServer(app);


server.on('error', (error:any) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${Port} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${Port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

// Listen for the 'listening' event on the server
server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Server listening on ${bind}`);
});
server.listen(Port,()=>{
    console.log(`app is runing on the port http://localhost:${Port} `);
});

const Mongo_URL = `mongodb://localhost:27017/users`;

mongoose.Promise = Promise;
mongoose.connect(Mongo_URL)
const dbConnection = mongoose.connection;

dbConnection.on("connected", () => {
    console.log(`Connected to MongoDB at ${Mongo_URL}`);
});

dbConnection.on("error", (error: Error) => {
    console.error("MongoDB Connection Error:", error.message);
});

dbConnection.on("disconnected", () => {
    console.log("MongoDB Connection Disconnected");
});

process.on("SIGINT", async () => {
    await dbConnection.close();
    console.log("MongoDB Connection Closed due to application termination");
    process.exit(0);
});


// all routes
app.use("/api",routes())
