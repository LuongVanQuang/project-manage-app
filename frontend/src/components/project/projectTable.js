import React from 'react'
import {Table, Button} from 'react-bootstrap'
import { Link} from 'react-router-dom';

class ProjectTable extends React.Component {
    render() {
            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.projects.map((project) => {
                            return (
                                <tr key={project.id}>
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                    <td>{project.description}</td>
                                    <td colSpan='2'>
                                        <Link to={'/projects/'+ project.id + '/update'}>
                                            <Button variant="primary">Edit</Button>{' '}
                                        </Link>
                                        <Link to={'/projects/'+ project.id + '/members'}>
                                            <Button variant="info">Members</Button>{' '}
                                        </Link>
                                            <Button variant="danger">Delete</Button>{' '}
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
export default ProjectTable
