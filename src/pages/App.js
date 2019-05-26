import React, { Component } from 'react';
import './App.less';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routerConfig from '../routers';
import AuthRoute from '../components/authRoute/authRoute';
import NoMatch from './nomatch/nomatch'
class App extends Component {
  render() {
    return <BrowserRouter>
    <Switch>
      {routerConfig.map((r, index) => 
        <AuthRoute key={index} exact path={r.path} component={r.component} auth={r.auth}/>
      )}
      <Route component={NoMatch} />
    </Switch>
</BrowserRouter>
  }
}

export default App;
