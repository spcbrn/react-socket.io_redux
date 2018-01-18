module.exports = {
  chat_rooms: {
    'defaultroom': {
      id: 'defaultroom',
      title: 'Default Room',
      messages: [
        {
          user: 'Bot',
          text: 'Welcome to the lamest chat ever!'
        }
      ]
    }
  },
  poll_rooms: {
    'defaultpoll': {
      id: 'defaultpoll',
      title: 'Is this talk useful?',
      active_users: 0,
      options: {
        a: {
          title: 'Not at all...',
          votes: 0
        },
        b: {
          title: 'I can\'t tell...',
          votes: 0
        },
        c: {
          title: 'Kind of...',
          votes: 0
        },
        d: {
          title: 'Totes...',
          votes: 0
        }
      }
    }
  }
}
