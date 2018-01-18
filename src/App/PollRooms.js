import React, { Component } from 'react';
import { connect } from 'react-redux';

import RoomCard from './RoomCard';

import actions from './../redux/actions';
let { joinRoom, leaveRoom } = actions.io;


class PollRooms extends Component {

  componentDidMount = () => {
    this.props.joinRoom('poll_rooms');
  }

  componentWillUnmount = () => {
    this.props.leaveRoom('poll_rooms');
  }

  render() {

    const makeRoomList = () => {
      let { active_polls } = this.props;
      let roomsList = [];
      for (let key in active_polls) {
        let { id, title } = active_polls[key];
        roomsList.push(<RoomCard key={key} id={id} title={title} path='poll' />)
      }
      return roomsList
    }

    return (
      <section className="rooms_main">
        <h3>Active Polls:</h3>
        <div className="rooms_list">
          {makeRoomList()}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    active_polls: state.polls
  }
}

export default connect(mapStateToProps, { joinRoom, leaveRoom })(PollRooms);
