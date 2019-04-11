import React, {Component} from 'react';

class Helper extends Component {



  render() {
    //intakes the content from the text input and puts each word seperated by a space into an array
    //run a forEach loop on that array with a function checkURL that uses regex to see if a url is an img
    //if it is we set a variable called img to that url, we remove it from the array with splice
    //rejoin that array with the url removed. Two booleans are used to see if that message has a url and if the
    //cell of the array is a URL
    let containsUrl = false;
    let str = this.props.item;
    let res = str.split(" ");
    let img = ''
    let eleIsUrl = ''
    res.forEach(function(element){
      eleIsUrl = checkURL(element)

      if (eleIsUrl){
        containsUrl = true;
        img = element
        let index = res.indexOf(element)
        res.splice(index, 1)
      }
      eleIsUrl = false;
    })
    let output = res.join(' ')


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
    }
    //if the type of message contains a URL we create a seperate img tag and use the variable output to put into message content instead of
    //this.props.item
    else if(this.props.type === 'incomingMessage' && containsUrl){
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
    } //if its not an incoming message it means its an incoming notification and the div thats rendered does not include
      //a user name or message content, instead its a message system notification with different styling
    else{
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

//function to check if a string is a url that is the address of an img
function checkURL(url) {
    return(url.match(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i) != null);
}

export default MainContent;

