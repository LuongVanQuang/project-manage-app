import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UserTable from './partials/userTable';
import { Container } from 'react-bootstrap';
import config from 'react-global-configuration';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  
  componentDidMount() {
    axios.get(`${config.get('BACKEND_API')}/api/users/`)
      .then(res => {
        const users = res.data.dataResponse;
        this.setState({ users: users });
      }).catch(error => {
        console.log(error.repsonse.data.message)
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