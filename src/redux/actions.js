
export const joinRoom = id => {
  return {
    type: 'server/join room',
    data: id
  }
}

export const leaveRoom = id => {
  return {
    type: 'server/leave room',
    data: id
  }
}

export const createNewChatRoom = name => {
  return {
    type: 'server/new chatroom',
    data: name
  }
}

export const submitChatMessage = body => {
  return {
    type: 'server/new message',
    data: body
  }
}

export const submitPollVote = vote => {
  return {
    type: 'server/new vote',
    data: vote
  }
}





export const setActiveChat = id => {
  return {
    type: 'LOAD_ACTIVE_CHAT',
    payload: id
  }
}

export const setActivePoll = id => {
  return {
    type: 'LOAD_ACTIVE_POLL',
    payload: id
  }
}
