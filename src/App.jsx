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
    this.AddMessage = this.AddMessage.bind(this)
    this.updateUser = this.updateUser.bind(this)

    this.state = {
      currentUser: null,
      messages: []
    }
  }


  AddMessage(message) {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, message];
    this.setState({ messages: newMessages });
  }

  updateUser(user){
    const newUser = user
    this.setState({currentUser: newUser});
  }


  render() {
    return (
      <div>
      <NavBar />
      <MessageList  messages={this.state} />
      <ChatBar updateUser={this.updateUser} AddMessage={this.AddMessage} currentUser={this.state.currentUser} />
      </div>
    );
  }
}


export default App;

