import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'

function NavBar(props){
  return (<nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
         <span style={{float: 'right', marginTop: '0.75em', fontSize: '1.5em'}}> {props.count} users online</span>
         </nav>)
}



class App extends Component {
  constructor(props){
    super()
    this.webSocket = new WebSocket('ws://localhost:3001/')
    this.addMessage = this.addMessage.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.state = {
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      currentNumUser: null,
      color: null
      };
    }


  componentDidMount() {
  console.log("componentDidMount <App />");


    this.webSocket.onopen = function (event) {
      console.log("connected to the server");
    };

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


  updateUser(newUser){
    this.webSocket.send(JSON.stringify({type: 'postNotification', oldUser: this.state.currentUser.name, newUser: newUser, text:`${this.state.currentUser.name} changed their name to ${newUser}`}))
    this.setState({currentUser: {name: newUser}});
  }

  addMessage(message) {
    this.webSocket.send(JSON.stringify(message))
  }



  render() {
    return (
      <div>
      <NavBar count={this.state.currentNumUser} />
      <MessageList  messages={this.state} />
      <ChatBar updateUser={this.updateUser} addMessage={this.addMessage} state={this.state} />
      </div>
    );
  }
}


export default App;

