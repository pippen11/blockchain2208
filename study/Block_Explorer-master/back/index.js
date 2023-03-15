const express = require('express');
const { sequelize } = require('./database/models');
const http = require('http');
const SocketIO = require('socket.io');
const router = require('./routes');
const app = express();
const httpServer = http.createServer(app);
const cors = require('cors');
const wsWeb3 = require('./wsWeb3');

const io = SocketIO(httpServer, {
    cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
    },
    requestCert: true,
    secure: true,
    rejectUnauthorized: false,
    transports: ['websocket'],
});
wsWeb3(io);

app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    }),
);

app.use('/api', router);

httpServer.listen(4000, async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('db synced');
        console.log('back server onload');
    } catch (err) {
        console.log(err);
    }
});
