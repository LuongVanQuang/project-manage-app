import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import NewMemberModal from './partials/newMemberModal';
import {ListGroup} from 'react-bootstrap';
import {Notification} from '../notification/index';
const queryString = require('query-string')


const ListGroupMembers = (props) => {
    return (
        props.members.map((member) => {
            return (
                <ListGroup.Item key={member.id}>
                    <Link to={'/users/'+ member.id}>
                        {member.name}
                    </Link>
                </ListGroup.Item>      
            )
        })
    );
}

class ProjectDetails extends React.Component {
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
                const resMembers = res.data.members;
                this.setState({
                    members: resMembers
                })
            })
            .catch((e) => {
                console.log(e.response)
            });
        }

    render() {
        const from = this.props.location.state || '/projects'
        const { fireRedirect } = this.state;
        let params = queryString.parse(this.props.location.search)
        return (
            <div>
                <div className='alert-notification'></div>
                <h1>Project name: {params.projectName}</h1>
                <ListGroup>
                    { 
                        this.state.members.length !== 0 ? 
                            <ListGroupMembers 
                                members={this.state.members} 
                            /> :
                            <ListGroup.Item>
                                <h3>No members</h3>
                            </ListGroup.Item> 
                    }
                </ListGroup>
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
export default ProjectDetails