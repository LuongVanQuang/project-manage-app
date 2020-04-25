import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UserTable from './userTable';
import { Container } from 'react-bootstrap';

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
        <Container>
            <h1>User List</h1>
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
        </Container>
    )
  }
}
export default Users