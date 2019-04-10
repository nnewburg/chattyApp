// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

ws.on('message', (data) => {
    let temp = JSON.parse(data);
    temp.id = uuidv1()
    console.log(temp);
    ws.send(JSON.stringify(temp))
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(temp));
    });
  });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(data) {
//     let temp = JSON.parse(data);
//     console.log(`id: ${uuidv1()} User ${temp.user} said ${temp.text}`);
//     // Broadcast to everyone else.
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     });
//   });
// });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

