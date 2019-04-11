import React, {Component} from 'react';

class Helper extends Component {

  render() {

    //if the type of message the websocket sends is from the chat input field the array of messages will render in the
    //messages format otherwise it will render as a notification
    if(this.props.type === 'incomingMessage'){
      return (
        <div key={this.name}>
          <div className="message">
            <span style={{color: this.props.color}} className="message-username">{this.props.user}</span>
            <span className="message-content">{this.props.item}</span>
          </div>
        </div>
      )
    } else{
        return (
          <div key={this.name}>
            <div className="message system">
              {this.props.item}
            </div>
          </div>
        )
      }
  }
}

//Main Content maps through the messages array from App's state and uses the helper component to render the proper
//jsx content dependning on type of message
class MainContent extends Component{
  render(){
      const messagesList = this.props.state.messages.map((message, index) => (
          <Helper key={index}
                  user={message.user}
                  item={message.text}
                  type={message.type}
                  color={message.color}
            />
          ))
      return (
          <main className="messages">
            {messagesList}
          </main>
          )
  }
}

export default MainContent;

