import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './login/login';

class App extends Component {
  render() {
    if ('11') { // 如果未登陆，则进入登陆页面
      return (
        <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Login}/>
          </Switch>
        </BrowserRouter>
      )
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }
  }
}

export default App;
