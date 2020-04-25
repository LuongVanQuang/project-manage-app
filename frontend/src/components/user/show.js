import React from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom';

const queryString = require('query-string')

const ListGroupProjects = (props) => {
  return (
      props.projects.map((project) => {
          return (
              <ListGroup.Item key={project.id}>
                  <Link to={'/projects/'+ project.id + '?projectName=' + project.name}>
                      {project.name}
                  </Link>
              </ListGroup.Item>      
          )
      })
  );
}

class UserDetails extends React.Component {
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
        let params = queryString.parse(this.props.location.search)
        return (
            <Container>
                <div className='alert-notification'></div>
                <h1>Project: {params.userName}</h1>
                <ListGroup>
                  { 
                    this.state.projects.length !== 0 ? 
                      <ListGroupProjects 
                        projects={this.state.projects} 
                      /> :
                      <ListGroup.Item>
                        <h3>No assignment</h3>
                      </ListGroup.Item> 
                  }
                </ListGroup>

                { fireRedirect && (
                    <Redirect to={from || '/'} />
                )}
            </Container>
        )
  }
}
export default UserDetails