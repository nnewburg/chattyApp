import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MainContent from './Message.jsx'

function NavBar(props){
  return (<nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
         </nav>)
}


class App extends Component {
  render() {
    return (
      <div>
      <NavBar />
      <MainContent />
      <ChatBar />
      </div>
    );
  }
}


export default App;

