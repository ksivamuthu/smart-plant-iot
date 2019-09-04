const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(express.static('kiosk/dist/kiosk'));

app.get('/health', (req, res) => {
    res.status(200).send('Healthy');
});

function listen() {
    server.listen(3000);
}

function send(data: any) {
    io.emit('SensorsDataReceived', data);
}

export { listen, send };