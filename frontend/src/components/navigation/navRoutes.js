import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from '../home/index';
import Users from '../user/index';
import User from '../user/show';
import Projects from '../project/index';
import Project from '../project/show';
import NotFound from '../notFound/index';

class NavRoute extends Component {
    render() {
        return (
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/users" component={Users} />
                    <Route path='/users/:id' component={User}></Route>
                    <Route path='/projects/:id' component={Project}></Route>
                    <Route exact path="/projects" component={Projects} />
                    <Route component={NotFound} />
                </Switch>
        )
    }
}

export default NavRoute;
