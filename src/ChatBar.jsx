import React, {Component} from 'react';

class FooterBar extends Component{
  constructor(props){
    super();
    this.handleKeyDown= this.handleKeyDown.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);

  }
   handleKeyDown(evt) {
      if(evt.keyCode === 13){
        // const child = this.refs.user.value
        // this.props.updateUser(child)
        const newMessage = evt.target.value;
        this.props.addMessage({type: "postMessage", text:newMessage, user:this.props.state.currentUser.name, color: this.props.state.color});
        evt.target.value = ''
      }
    }

    // handleChange(event){
    //   this.setState({currentUser: event.target.value})
    // }

    handleNameChange(event){
      if(event.keyCode === 13){
        const oldUser = this.props.state.currentUser.name
        const newUser = this.refs.user.value
        // this.setState({currentUser: newUser })
        this.props.updateUser(newUser)
      }
    }




  render(){
    return (
      <footer className="chatbar">
      <input onKeyDown={this.handleNameChange} onChange={this.handleChange} ref="user" className="chatbar-username" placeholder="Your Name (Optional)" />
      <input onKeyDown={this.handleKeyDown} name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
      );
    }
  }

export default FooterBar;