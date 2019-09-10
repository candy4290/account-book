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
        <AuthRoute key={index} exact={r.exact} path={r.path} url={r.url} component={r.component} auth={r.auth} childs={r.children}/>
      )}
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>
  }
}

export default App;
