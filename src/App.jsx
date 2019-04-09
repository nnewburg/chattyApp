import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'

function NavBar(props){
  return (<nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
         </nav>)
}


class App extends Component {
  constructor(props){
    super()
    this.addMessage = this.addMessage.bind(this)
    this.updateUser = this.updateUser.bind(this)

    this.state = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      user: "Bob",
      text: "Has anyone seen my marbles?",
    },
    {
      user: "Anonymous",
      text: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}
  }



  updateUser(user){
    const newUser = user
    this.setState({currentUser: newUser});
  }

  componentDidMount() {
  console.log("componentDidMount <App />");
  this.webSocket = new WebSocket("ws://localhost:3001/");
  setTimeout(() => {


    this.webSocket.onopen = function (event) {
      console.log("connected to the server");
    };

    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, user: "Michelle", text: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

  addMessage(message) {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, message];
    this.webSocket.send(JSON.stringify(message))
    this.setState({ messages: newMessages });
  }



  render() {
    return (
      <div>
      <NavBar />
      <MessageList  messages={this.state} />
      <ChatBar updateUser={this.updateUser} addMessage={this.addMessage} currentUser={this.state} />
      </div>
    );
  }
}


export default App;

