import React from 'react'
import { NavLink } from 'react-router-dom';
import NavRoute from './navRoutes'

class Navigation extends React.Component {
  render() {
      return (
            <div>
                <ul>
                    <li>
                     <NavLink exact activeClassName="active" to='/'>Home</NavLink>
                    </li>
                    <li>
                     <NavLink activeClassName="active" to='/users'>Users</NavLink>
                    </li>
                    <li>
                     <NavLink activeClassName="active"to='/projects'>Project</NavLink>
                    </li>
                </ul>
                <NavRoute />
        </div>
      )
  }
}
export default Navigation
