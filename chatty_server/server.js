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

let userCount = 0;
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  let randomNum = Math.floor((Math.random() * 4) + 0);
  let color = ''
  if(randomNum === 0){
    color = 'red'
  } else if(randomNum === 1){
    color = 'green'
  } else if(randomNum === 2){
    color = 'blue'
  } else {
    color = 'yellow'
  }

  userCount++
  console.log('Client connected');
  let colorObject = {color: color, type: 'assignedColor'};
  let onlineObject = {count: userCount, type: "numUser"}

  ws.send(JSON.stringify(colorObject))


  wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(onlineObject));
  });

ws.on('message', (data) => {
    let temp = JSON.parse(data);
    temp.id = uuidv1()
    console.log(temp);
    if(temp.type === 'postMessage'){
      temp.type = 'incomingMessage'
    } else {
      temp.type = 'incomingNotification'
    }

    console.log(temp);
    // ws.send(JSON.stringify(temp))
    wss.clients.forEach(function each(client) {

        client.send(JSON.stringify(temp));

    });
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    userCount--
    let onlineObject = {count: userCount, type: "numUser"}
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(onlineObject));
      });

    console.log('Client disconnected')
  });
});

