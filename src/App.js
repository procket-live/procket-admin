import React, { Component } from 'react';
import IndexRouter from './Router/index.router';
import Notifications from 'react-notify-toast';

class App extends Component {
  render() {
    return (
      <div>
        <IndexRouter />
        <Notifications />
      </div>
    );
  }
}

export default App;
