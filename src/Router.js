import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Posts from './Posts';
import Home from './Home';
import Remix from './Remix';
import Tuneposts from './Tuneposts';

const Router = () => (
    <div>
        <Switch>
        <Route exact path="/" component = {Home}></Route>
        <Route exact path="/posts/:track/:accessToken" component = {Posts}></Route>
        <Route exact path="/remix/:track/:post/:accessToken" component = {Remix}></Route>
        <Route exact path="/remixposts" component = {Tuneposts}></Route>
        </Switch>
    </div>
)

export default Router;