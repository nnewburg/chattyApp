import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component{
  render(){
    return (<Message messages={this.props.messages} />)
  }
}



export default MessageList
