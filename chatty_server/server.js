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

//create a variable to keep track of how many people are logged on
let userCount = 0;
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback. the client is also assigned a color
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
    color = 'orange'
  }

  //increment the number of people logged on
  userCount++
  console.log('Client connected');
  //create two objects one that is a broadcast to all connected clients the number of clients connected
  //the other is sent only to the recently connected client assigning them a color
  let colorObject = {color: color, type: 'assignedColor'};
  let onlineObject = {count: userCount, type: "numUser"}

  ws.send(JSON.stringify(colorObject))

//broadcast the usersOnline object to all connected clients
  wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(onlineObject));
  });

//when the websocket receives a message it relays that message to all connected clients
//it assings that message a unique id and a type
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
    //loop to message each client the message that was sent to the server
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(temp));
    });

  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  //broadcasts all connected clients that someone closed the browser after decrementing the userCount
  ws.on('close', () => {
    userCount--
    let onlineObject = {count: userCount, type: "numUser"}
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(onlineObject));
      });

    console.log('Client disconnected')
  });
});

