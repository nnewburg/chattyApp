Chatty App
=====================

A ReactJS based chat application using Websockets. Multiple clients can connect
change their username, and broadcast a message to all other connected clients.

### Usage

```
git clone git@github.com:nnewburg/chattyApp.git [*namedAny]
```

Install the dependencies and start the server. You will need to npm install in chattyApp
and chattyServer both servers are started with npm start

```
npm install
npm start
open http://localhost:3000
```
### Screenshots

!["Screenshot of chatty messages"](https://github.com/nnewburg/chattyApp/blob/master/docs/chatty1.png?raw=true)
!["Screenshot of chatty messages"](https://github.com/nnewburg/chattyApp/blob/master/docs/chatty2.png?raw=true)
!["Screenshot of chatty messages"](https://github.com/nnewburg/chattyApp/blob/master/docs/chatty3.png?raw=true)
!["Screenshot of chatty messages"](https://github.com/nnewburg/chattyApp/blob/master/docs/chatty4.png?raw=true)
!["Screenshot of chatty messages"](https://github.com/nnewburg/chattyApp/blob/master/docs/chatty5.png?raw=true)
!["Screenshot of chatty messages"](https://github.com/nnewburg/chattyApp/blob/master/docs/chatty6.png?raw=true)


### Lessons Learned

* Worked with React for the first time and the relationship between components and their state/properties
* Binding events to components and passing state as props to child components
* Learned how Websockets function with clients using the onConnection, onMessage, and onClose functionalities
* Understanding more about JSON when servers attempt to communicate with one another


### Dependencies

* React
* React-dom
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* Css-loader
* Sass-loader
* Style-loader
* Sockjs-client

### Dependencies for chattyServer

* Express
* Ws
* Uuid