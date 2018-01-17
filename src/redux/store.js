import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';

import reducer from './main_reducer';

const socket = io()
    , socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

export default createStore( reducer, applyMiddleware( socketIoMiddleware ));
