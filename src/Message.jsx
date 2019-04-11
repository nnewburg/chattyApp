import React, {Component} from 'react';

class Helper extends Component {



  render() {

    let containsUrl = false;
    let str = this.props.item;
    let res = str.split(" ");
    let img = ''
    let eleIsUrl = ''
    res.forEach(function(element){

      eleIsUrl = checkURL(element)

      if (eleIsUrl){
        containsUrl = true;
        console.log('works')
         img = element
        let index = res.indexOf(element)
        res.splice(index, 1)
      }
      eleIsUrl = false;
    })
    let output = res.join(' ')
     console.log(output)

    //if the type of message the websocket sends is from the chat input field the array of messages will render in the
    //messages format otherwise it will render as a notification
    if(this.props.type === 'incomingMessage' && !containsUrl){
      return (
        <div key={this.name}>
          <div className="message">
            <span style={{color: this.props.color}} className="message-username">{this.props.user}</span>
            <span className="message-content">{this.props.item}</span>
          </div>
        </div>
      )
    } else if(this.props.type === 'incomingMessage' && containsUrl){
      return (
        <div key={this.name}>
          <div className="message">
            <span style={{color: this.props.color}} className="message-username">{this.props.user}</span>
            <span className="message-content" >{output}</span>
          </div>
          <div>
          <img src={img} style={{zIndex: '0', position: 'relative', left: '15%',height:'5%' ,width: '20%'}} />
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

function checkURL(url) {
    return(url.match(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i) != null);
}

export default MainContent;

