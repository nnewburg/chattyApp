import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'

function NavBar(props){
  return (<nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
         <span style={{float: 'right', marginTop: '0.75em', fontSize: '1.5em'}}> {props.count} users online</span>
         </nav>)
}


//Class constructor for App all other components get rendered into app
class App extends Component {
  constructor(props){
    super()
    this.webSocket = new WebSocket('ws://localhost:3001/')
    this.addMessage = this.addMessage.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      currentNumUser: null,
      color: null
      };
    }

  //function to see if the component mounted to the websocket
  componentDidMount() {
  console.log("componentDidMount");


    this.webSocket.onopen = function (event) {
      console.log("connected to the server");
    };

    // if the client receives a message from the websocket check the type of message:
    // if the message has the type incomingMessage or incomingNotification it updates the state of app
    // with the content of the received message from the websocket, causing the render function to update the array of messages
    // if the message has the type assignedColor it sets the state of that client's color to the randomly generated color
    // if the message has the type numUser it updates the state of numUsers
     this.webSocket.onmessage = (event) => {

       if(JSON.parse(event.data).type === 'incomingMessage' || JSON.parse(event.data).type === 'incomingNotification'){
         const oldMessages = this.state.messages;
         const newMessages = [...oldMessages, JSON.parse(event.data)];
         this.setState({ messages: newMessages });
        }
         else if(JSON.parse(event.data).type === 'assignedColor'){
          this.setState({color: JSON.parse(event.data).color})
        }else{
          let sup = JSON.parse(event.data)
          this.setState({currentNumUser: sup.count})
        }
      }
}

  //updateUser is passed to the chatbar component and when  the user input box is submitted is calls updateUser
  //the client sends a message to the websocket with the postNotification indicating a user changed their name
  //the websocket broadcasts that notification to all connected clients the client also updates its state for CurrentUser
  updateUser(newUser){
    this.webSocket.send(JSON.stringify({type: 'postNotification', oldUser: this.state.currentUser.name, newUser: newUser, text:`${this.state.currentUser.name} changed their name to ${newUser}`}))
    this.setState({currentUser: {name: newUser}});
  }

  //addMessage is passed to the chatbar component and when the chat box has enter pressed on it it calls addMessage
  //add message sends a message with the type postMessage the websocket broadcasts that message to all connected cliens
  //and the .onmessage callback receives the broadcast message and sets the state of the messages array when the state
  //is updated the render method recalls
  addMessage(message) {
    this.webSocket.send(JSON.stringify(message))
  }



  render() {
    return (
      <div>
      <NavBar count={this.state.currentNumUser} />
      <MessageList  state={this.state} />
      <ChatBar updateUser={this.updateUser} addMessage={this.addMessage} state={this.state} />
      </div>
    );
  }
}


export default App;

