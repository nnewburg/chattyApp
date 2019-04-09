import React, {Component} from 'react';

class Helper extends Component {
  render() {

    const anonymousUser = this.props.user ? (<span className="message-username">{this.props.user}</span>) :(
     <span className="message-username">Anonymous</span>)
    return (
      <div key={this.name}>
        <div className="message">
          {anonymousUser}
          <span className="message-content">{this.props.item}</span>
        </div>
        <div className="message system">
        </div>
      </div>
  );
  }
}

class MainContent extends Component{
  render(){
    const messagesList = this.props.messages.messages.map((message, index) => (
        <Helper key={index} user={message.user} item={message.text} />
      ))
 return (
  <main className="messages">
  {messagesList}
  </main>)

}
}

export default MainContent;

