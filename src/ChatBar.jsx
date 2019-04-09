import React, {Component} from 'react';

class FooterBar extends Component{
  constructor(props){
    super();
    this.handleKeyDown= this.handleKeyDown.bind(this);

  }
   handleKeyDown(evt) {
      if(evt.keyCode === 13){
        const child = this.refs.user.value
        this.props.updateUser(child)
        const newMessage = evt.target.value;
        this.props.addMessage({text:newMessage, user:child});
        evt.target.value = ''
      }
    }



  render(){
    return (
      <footer className="chatbar">
      <input ref="user" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.currentUser.name} />
      <input onKeyDown={this.handleKeyDown} name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
      );
    }
  }

export default FooterBar;