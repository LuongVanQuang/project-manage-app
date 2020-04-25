import React from 'react';
import axios from 'axios';
import {Container} from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom';

class UserProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        };
    }


    componentDidMount() {
        const userId = this.props.match.params.id
        axios.get(`http://localhost:5000/api/users/${userId}/projects`)
            .then(res => {
                const resProjects = res.data.projects;
                this.setState({
                    projects: resProjects
                })
            })
            .catch((e) => {
                console.log(e.response)
            });
        }

    render() {
        const from = this.props.location.state || '/users'
        const { fireRedirect } = this.state;
        return (
            <Container>
                <div className='alert-notification'></div>
                <h1>Project assigned</h1>
                <ul>
                {
                    this.state.projects.map((project) => {
                        return (
                            <li key={project.id}>
                                <Link to={'/projects/'+ project.id}>
                                {project.name}
                                </Link>
                            </li>
                        )

                    })
                }
                </ul>

                { fireRedirect && (
                    <Redirect to={from || '/'} />
                )}
            </Container>
        )
  }
}
export default UserProject