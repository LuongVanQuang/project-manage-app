import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import NewMemberModal from './newMemberModal'

class ProjectMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
        };
    }

    componentDidMount() {
        const projectId = this.props.match.params.id
        axios.get(`http://localhost:5000/api/projects/${projectId}/members`)
            .then(res => {
                const resProjects = res.data.projects;
                this.setState({
                    members: resProjects
                })
            })
            .catch((e) => {
                console.log(e.response)
            });
        }

    render() {
        const from = this.props.location.state || '/projects'
        const { fireRedirect } = this.state;
        return (
            <div>
                <div className='alert-notification'></div>
                <h1>User assignment</h1>
                <ul>
                {
                    this.state.members.map((user) => {
                        return (
                            <li key={user.id}>
                                <Link to={'/users/'+ user.id}>
                                    {user.name}
                                </Link>
                            </li>
                        )

                    })
                }
                </ul>
                <NewMemberModal
                    project_id={this.props.match.params.id}
                    members={this.state.members}
                />
                { fireRedirect && (
                    <Redirect to={from || '/'} />
                )}
            </div>
        )
    }
}
export default ProjectMember