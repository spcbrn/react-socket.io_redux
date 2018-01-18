
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

    case `LOAD chat_rooms`:
      return Object.assign({}, state, { chats: action.payload });

    case 'LOAD poll_rooms':
      return Object.assign({}, state, { polls: action.payload });

    case 'NEW_VOTE':
      return Object.assign({}, state, { active_poll: action.payload });

    case 'NEW_MESSAGE':
      let chatUpdate = state.active_chat;
      chatUpdate.messages = action.payload;
      return Object.assign({}, state, { active_chat: chatUpdate });

    case 'NEW_CHATROOM':
      return Object.assign({}, state, { chats: action.payload });

    case 'server/get chat':
      let chatData = state.chats[action.data];
      if (chatData) return Object.assign({}, state, { active_chat: chatData })
      return;

    case 'LOAD_CHAT':
      return Object.assign({}, state, { active_chat: action.payload })

    case 'server/get poll':
      let pollData = state.polls[action.payload];
      if (pollData) return Object.assign({}, state, { active_poll: pollData })
      return;

    case 'LOAD_POLL':
      return Object.assign({}, state, { active_poll: action.payload })

    default:
      return state;
  }
}


export default reducer;
