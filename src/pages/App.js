import React, { Component } from 'react';
import './App.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routerConfig from '../routers';
import AuthRoute from '../components/authRoute/authRoute';
class App extends Component {
  render() {
    return <BrowserRouter>
    <Switch>
      {routerConfig.map((r, index) => 
        <AuthRoute key={index} exact path={r.path} component={r.component} auth={r.auth}/>
      )}
    </Switch>
</BrowserRouter>
  }
}

export default App;
