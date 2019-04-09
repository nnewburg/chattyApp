import React, {Component} from 'react';

class FooterBar extends Component{
  constructor(props){
    super();
    this.handleKeyDown= this.handleKeyDown.bind(this);

  }
   handleKeyDown(evt) {
      if(evt.keyCode === 13){
        const newMessage = evt.target.value;
        this.props.AddMessage(newMessage);
      }
    }



  render(){
    return (
      <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" />
      <input onKeyDown={this.handleKeyDown} name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
      );
    }
  }

export default FooterBar;