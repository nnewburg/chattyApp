import React, {Component} from 'react';

class Helper extends Component {
  // console.log(this.props.color)
  render() {

    const anonymousUser = this.props.user ? (<span style={{color: this.props.color}} className="message-username">{this.props.user}</span>) :(
     <span className="message-username">Anonymous</span>)
    if(this.props.type === 'incomingMessage'){
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
    } else{
    return (
      <div key={this.name}>
        <div className="message">

        </div>
        <div className="message system">
          {this.props.item}
        </div>
      </div>
  );
    }
  }
}

class MainContent extends Component{
  render(){
    console.log(this.props)
    const messagesList = this.props.messages.messages.map((message, index) => (
        <Helper key={index} user={message.user} item={message.text} type={message.type} color={message.color} />
      ))
 return (
  <main className="messages">
  {messagesList}
  </main>)

}
}

export default MainContent;

