import React, {Component} from 'react';

class FooterBar extends Component{
  constructor(props){
    super();
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  //function to handle when a user inputs a text value
  //checks the value of the text box and calls the addMessage function from the app component
  //the type of message is defined as postMessage
   handleTextInput(event) {
      if(event.keyCode === 13){
        this.props.addMessage({type: "postMessage", text:event.target.value, user:this.props.state.currentUser.name, color: this.props.state.color});
        event.target.value = '';
      }
    }

   //function to handle when a user inputs a new username
  //checks the value of the user text box and calls the updateUser function from the app component
  //the type of message is defined as postNotification
    handleNameChange(event){
      if(event.keyCode === 13){
        const newUser = this.refs.user.value;
        this.props.updateUser(newUser);
      }
    }

  render(){
    return (
      <footer className="chatbar">
      <input onKeyDown={this.handleNameChange} ref="user" className="chatbar-username" placeholder="Your Name (Optional)" />
      <input onKeyDown={this.handleTextInput} name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
      );
    }
  }

export default FooterBar;