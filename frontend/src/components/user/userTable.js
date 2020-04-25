import React from 'react'
import {Table, Button} from 'react-bootstrap'
import { Link} from 'react-router-dom';

class UserTable extends React.Component {
  render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Birthday</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { this.props.users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.birthday}</td>
                                <td colSpan='2'>
                                <Link to={'/users/'+ user.id + '/update'}>
                                     <Button variant="primary">Edit</Button>{' '}
                                </Link>
                                <Link to={'/users/'+ user.id + '/projects'}>
                                    <Button variant="info">Projects</Button>{' '}
                                </Link>
                                </td>
                            </tr>
                        )
                        })
                    }
                </tbody>
            </Table>
        )
  }
}
export default UserTable
