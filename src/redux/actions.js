
const actions = {
  io: {
    joinRoom: id => {
      return {
        type: 'server/join room',
        data: id
      }
    },
    leaveRoom: id => {
      return {
        type: 'server/leave room',
        data: id
      }
    },
    createNewChatRoom: name => {
      return {
        type: 'server/new chatroom',
        data: name
      }
    },
    submitChatMessage: body => {
      return {
        type: 'server/new message',
        data: body
      }
    },
    submitPollVote: vote => {
      return {
        type: 'server/new vote',
        data: vote
      }
    },
    setActivePoll: id => {
      return {
        type: 'server/get poll',
        data: id
      }
    },
    setActiveChat: id => {
      return {
        type: 'server/get chat',
        data: id
      }
    }
  }
}

export default actions;
