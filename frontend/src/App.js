import React, { Component } from 'react';
import './App.css';

import Navigation from './components/navigation/index';
//import Home from './components/home/index';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:5000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
      //this.callAPI();
  }
  render() {
    return (
      <Router>
          <Navigation />
      </Router>
    )
  }
}
export default App;
