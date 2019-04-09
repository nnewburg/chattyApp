import React, {Component} from 'react';

class Helper extends Component {
  render() {
    return <span className="message-content">{this.props.item}</span>;
  }
}

class MainContent extends Component{
  render(){
    const messagesList = this.props.messages.map(message => (
        <Helper item={message} />
      ))
 return (
  <main className="messages">
  <div className="message">
    <span className="message-username">Anonymous1</span>
    <span className="message-content">{messagesList}</span>
  </div>
  <div className="message system">
    Anonymous1 changed their name to nomnom.
  </div>
  </main>)

}
}

export default MainContent;
