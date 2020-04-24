import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UserTable from './userTable';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  
  componentDidMount() {
    axios.get(`http://localhost:5000/api/users/`)
      .then(res => {
        const persons = res.data.users;
        this.setState({ users: persons });
      })
  }

  render() {
    return (
        <div>
            <h1>Users</h1>
            <div className='list-user'>
              <UserTable 
                users={this.state.users}
              />
            </div>
            <ul>
                <Link to='/users/new'>
                    <Button variant="success">New User</Button>{' '}
                </Link>
            </ul>
        </div>
    )
  }
}
export default Users