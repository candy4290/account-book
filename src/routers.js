import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/home';
import WrappedNormalLoginForm from './pages/login/login';
const BasicRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={WrappedNormalLoginForm}/>
            <Route exact path="/" component={Home}/>
        </Switch>
    </BrowserRouter>
);

export default BasicRoute;