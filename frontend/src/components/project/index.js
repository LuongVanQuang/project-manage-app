import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ProjectTable from './partials/projectTable';
import config from 'react-global-configuration';


class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }
  
  componentDidMount() {
    axios.get(`${config.get('BACKEND_API')}/api/projects/`)
      .then(res => {
        const resProjects = res.data.dataResponse;
        this.setState({ projects: resProjects });
      }).catch((e) => {
        alert(e.response.data.message)
     });
  }

  render() {
    return (
        <div>
            <h1>Projects</h1>
            <div className='list-project'>
              <ProjectTable 
                projects={this.state.projects}
              />
            </div>
            <Link to='/projects/new'>
                <Button variant="success">New Project</Button>{' '}
            </Link>
        </div>
    )
  }
}
export default Projects
