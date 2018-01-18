import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import actions from './../redux/actions';
let { joinRoom, leaveRoom, setActivePoll, submitPollVote } = actions.io;


class PollDetail extends Component {

  componentDidMount = () => {
    this.props.joinRoom(this.props.match.params.id);
    this.props.setActivePoll(this.props.match.params.id);
  }

  componentWillUnmount = () => {
    this.props.leaveRoom(this.props.match.params.id);
  }

  submitVote = option => {
    let vote = {
      poll_id: this.props.match.params.id,
      option
    }

    this.props.submitPollVote(vote);
  }

  render() {

    const createDataSet = () => {
      let { options } = this.props.poll_data;
      let labels = [];
      let data = [];
      for (let key in options) {
        labels.push(options[key].title)
        data.push(options[key].votes)
      }

      return {
        labels,
        datasets: [
          {
            label: this.props.poll_data.title ? this.props.poll_data.title : '',
            backgroundColor: 'lightblue',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 3,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: data
          }
        ]
      }
    }

    return (
      <section className="poll_detail_main">
        <h3>{this.props.poll_data.title ? this.props.poll_data.title : 'loading...'}</h3>
        {this.props.poll_data.id ? <Bar data={createDataSet()} /> : null}
        <button onClick={() => this.submitVote('a')}>A</button>
        <button onClick={() => this.submitVote('b')}>B</button>
        <button onClick={() => this.submitVote('c')}>C</button>
        <button onClick={() => this.submitVote('d')}>D</button>
      </section>
    )
  }
}

const mapStateToProps = state => {
  if (!state) return { poll_data: {} };
  if (state.active_poll) return { poll_data: state.active_poll };
  return { poll_data: {} }
}

export default connect(mapStateToProps, { joinRoom, leaveRoom, setActivePoll, submitPollVote })(PollDetail);
