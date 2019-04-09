import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component{
  render(){
    return (<Message user={this.props.user} messages={this.props.messages} />)
  }
}



export default MessageList
