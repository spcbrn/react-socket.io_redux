import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import ChatRooms from './ChatRooms';
import PollRooms from './PollRooms';
import ChatDetail from './ChatDetail';
import PollDetail from './PollDetail';

import './App.css';

class App extends Component {

  render() {

    return (
      <main className="App">
        <nav className="main_nav">
          <Link to="/">Home</Link>
          <Link to="/chat">Chat Rooms</Link>
          <Link to="/poll">Poll Rooms</Link>
        </nav>
        <Switch>
          <Route exact path="/" render={props => <h1>There is literally nothing here...</h1>}/>
          <Route exact path="/chat/:id" component={ChatDetail} />
          <Route path="/chat" component={ChatRooms}/>
          <Route exact path="/poll/:id" component={PollDetail} />
          <Route path="/poll" component={PollRooms}/>
        </Switch>
      </main>
    )
  }
};

export default App;
