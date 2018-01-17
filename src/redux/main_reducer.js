
const initialState = {
  activeUsers: 0,
  pollUsers: 0,
  chatUsers: 0,
  polls: {},
  chats: {},
  active_chat: null,
  active_poll: null
}




const reducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case `load chat_rooms`:
      return Object.assign({}, state, {chats: action.data});
    case 'load poll_rooms':
      return Object.assign({}, state, {polls: action.data});
    case 'LOAD_ACTIVE_CHAT':
      let chatData = state.chats[action.payload];
      return Object.assign({}, state, {active_chat: chatData});
    case 'LOAD_ACTIVE_POLL':
      let pollData = state.polls[action.payload];
      return Object.assign({}, state, {active_poll: pollData});
    case 'POLL_UPDATE':
      return Object.assign({}, state, {active_poll: action.payload})
    case 'NEW_MESSAGE':
      let chatUpdate = state.active_chat;
      chatUpdate.messages = action.payload;
      return Object.assign({}, state, {active_chat: chatUpdate});
    case 'NEW_CHATROOM':
      return Object.assign({}, state, {chats: action.payload});
    default:
      return state;
  }
}

export default reducer;
