import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ProjectTable from './partials/projectTable';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }
  
  componentDidMount() {
    axios.get(`http://localhost:5000/api/projects/`)
      .then(res => {
        const resProjects = res.data.projects;
        this.setState({ projects: resProjects });
      })
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
