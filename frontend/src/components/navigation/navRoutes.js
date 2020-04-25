import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from '../home/index';
import Users from '../user/index';
import User from '../user/show';
import NewUser from '../user/new';
import UpdateUser from '../user/update';
import Projects from '../project/index';
import ProjectDetails from '../project/show';
import NewProject from '../project/new';
import UpdateProject from '../project/update';
import NotFound from '../notFound/index';

class NavRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={Users} />
                <Route path='/users/new' component={NewUser} />
                <Route path='/users/:id/update' component={UpdateUser} />
                <Route path='/users/:id' component={User} />
                <Route exact path="/projects" component={Projects} />
                <Route path='/projects/new' component={NewProject} />
                <Route path='/projects/:id/update' component={UpdateProject} />
                <Route path='/projects/:id' component={ProjectDetails} />
                <Route component={NotFound} />
            </Switch>
        )
    }
}

export default NavRoute;
