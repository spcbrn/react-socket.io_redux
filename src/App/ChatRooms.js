import React, { Component } from 'react';
import { connect } from 'react-redux';

import RoomCard from './RoomCard';

import actions from './../redux/actions';
let { joinRoom, leaveRoom, createNewChatRoom } = actions.io;


class ChatRooms extends Component {

  componentDidMount = () => {
    this.props.joinRoom('chat_rooms');
  }

  componentWillUnmount = () => {
    this.props.leaveRoom('chat_rooms');
  }

  createNewRoom = () => {
    let { roomTitle } = this.refs;

    this.props.createNewChatRoom(roomTitle.value);
    roomTitle.value = '';
  }

  render() {

    const makeRoomList = () => {
      let { active_chats } = this.props;
      let roomsList = [];
      for (let key in active_chats) {
        let { id, title } = active_chats[key];
        roomsList.push(<RoomCard key={key} id={id} title={title} path='chat' />)
      }
      return roomsList
    }

    return (
      <section className="rooms_main">
        <h3>Create new Chatroom</h3>
        <input ref='roomTitle' placeholder='name your chatroom...' />
        <button onClick={this.createNewRoom}>Create</button>
        <h3>Active Chats:</h3>
        <div className="rooms_list">
          {makeRoomList()}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    active_chats: state.chats
  }
}

export default connect(mapStateToProps, { joinRoom, leaveRoom, createNewChatRoom })(ChatRooms);
