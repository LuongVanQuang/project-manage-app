import React, { Component } from 'react';
import { Route } from 'react-router';
import Project from '../project/show';
import User from '../user/show';

class HomeRouter extends Component {
    render(){
        return (
            <div>
                <Route path='/users/:id' component={User}></Route>
                <Route path='/projects/:id' component={Project}></Route>
            </div>
        );
    }
}

export default HomeRouter;