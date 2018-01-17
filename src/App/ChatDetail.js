import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatMessage from './ChatMessage';

import { joinRoom, leaveRoom, setActiveChat, submitChatMessage } from './../redux/actions';

class ChatDetail extends Component {

  componentDidMount = () => {
    this.props.setActiveChat(this.props.match.params.id);
    this.props.joinRoom(this.props.match.params.id);
  }

  componentWillUnmount = () => {
    this.props.leaveRoom(this.props.match.params.id);
  }

  submitMessage = event => {
    if (event.keyCode !== 13) return

    let newMessage = {
      room_id: this.props.match.params.id,
      user: this.refs.username.value,
      text: this.refs.input.value
    };

    this.props.submitChatMessage(newMessage);
    this.refs.input.value = '';
  }

  render() {

    const messageList = this.props.chat_messages.map((c, i) => {
      return (
        <ChatMessage key={i}
                     user={c.user}
                     text={c.text}
        />
      )
    })

    return (
      <section className="chat_window_main">
        <h3>IO Chat</h3>
        <div id="chat_window_container">
          <div id="chat_window_messages_main">
            <div id="chat_window_messages_container">
              {messageList}
            </div>
          </div>
          <div id="chat_window_new_message_container">
            <input placeholder="Username"
                   ref="username"
            />
            <input placeholder="Type a message..."
                   ref="input"
                   onKeyDown={this.submitMessage}
            />
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    chat_messages: state.active_chat ? state.active_chat.messages : []
  }
}

export default connect(mapStateToProps, { joinRoom, leaveRoom, setActiveChat, submitChatMessage })(ChatDetail);
