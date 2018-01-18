require('dotenv').config();

//------------DEPENDENCIES------------//

const express = require('express')
    , path = require('path')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , socket = require('socket.io')
    , db = require('./fake_db');

const app = express();

app.use(bodyParser.json());
app.use(cors());

//-----------------ENV----------------//

const port = process.env.PORT || 8042
    , app_url = process.env.REACT_APP_BASEURL;

//---------INITIALIZE SERVER----------//

io = socket(app.listen(port, () => console.log(`serving port ${port}`)));

//-----------------IO-----------------//

io.on('connect', socket => {
  console.log(`User connected on socket ${socket.id}`);
  socket.on('disconnect', () => console.log(`User disconnected from socket ${socket.id}`));

  socket.on('action', action => ioReducer(action, socket, io));
})

const ioReducer = (action, socket, io) => {
  let room_types = ['poll_rooms', 'chat_rooms'];

  switch (action.type) {

    case 'server/join room':
      socket.join(action.data);
      console.log(`User ${socket.id} joined room ${action.data}`);
      room_types.includes(action.data)
        ? io.to(socket.id).emit('action', { type: `LOAD ${action.data}`, payload: db[action.data] })
        : null;
      break;

    case 'server/leave room':
      socket.leave(action.data);
      console.log(`User ${socket.id} left room ${action.data}`);
      break;

    case 'server/new chatroom':
      let newChatRoomId = action.data.replace(/[^a-zA-Z||\d]+/g, '');
      let newChatRoom = {
          id: newChatRoomId,
          title: action.data,
          messages: [
            {
              user: 'Bot',
              text: `Welcome to ${action.data}!`
            }
          ]
        }
      db.chat_rooms[newChatRoomId] = newChatRoom;
      io.in('chat_rooms').emit('action', {type: 'NEW_CHATROOM', payload: db.chat_rooms});
      break;

    case 'server/get chat':
      io.in(action.data).emit('action', { type: 'LOAD_CHAT', payload: db.chat_rooms[action.data] })
      break;

    case 'server/get poll':
      io.in(action.data).emit('action', { type: 'LOAD_POLL', payload: db.poll_rooms[action.data] })
      break;

    case 'server/new message':
      let { room_id, user, text } = action.data;

      db.chat_rooms[room_id].messages = [{user, text}, ...db.chat_rooms[room_id].messages];
      io.in(room_id).emit('action', {type: 'NEW_MESSAGE', payload: db.chat_rooms[room_id].messages})
      break;

    case 'server/new vote':
      let { poll_id, option } = action.data;

      db.poll_rooms[poll_id].options[option].votes = ++db.poll_rooms[poll_id].options[option].votes;
      io.in(poll_id).emit('action', {type: 'NEW_VOTE', payload: db.poll_rooms[poll_id]});

    default:
      break;
  }
}

//----------------REST----------------//

// app.get('/*', (req, res) => res.sendFile(__dirname + './../dist/index.html'));
