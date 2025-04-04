const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const { receiveInput } = require('../COMMUNICATION/core');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./ui/index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        const userInput = message.toString();
        const response = receiveInput(userInput);
        ws.send(`Input: ${response.input}`);
        ws.send(`Anchor: vector: ${response.intentData.vector}, action: ${response.intentData.action}, pillar: ${response.intentData.pillar}`);
        ws.send(response.hopeEcho);
        ws.send(response.chronosEcho);
    });

    ws.on('close', () => console.log('Client disconnected'));
});

server.listen(8080, () => console.log('Server running on http://localhost:8080'));