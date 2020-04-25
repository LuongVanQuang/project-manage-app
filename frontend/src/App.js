import React, { Component } from 'react';
import './App.css';

import Navigation from './components/navigation/index';
//import Home from './components/home/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return (
      <Router history={history}>
          <Navigation />
      </Router>
    )
  }
}
export default App;
