import React from 'react';
//import { Link} from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import ProjectForm from './form';

class UpdateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        project: {},
        fireRedirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(target) {
        this.setState(prevState => ({
            project: {
                ...prevState.project,
                [target.name]: target.value
            }
        })
        )
    }
  handleSubmit(event) {
    const project = this.state.project;
    console.log('asdmasd')
    axios.post(`http://localhost:5000/api/projects/update/${project.id}` , {project})
      .then(res => {
          console.log(res)
          this.setState({fireRedirect: true})
    });
    event.preventDefault();

  }
  componentDidMount() {
    const projectId = this.props.match.params.id
    axios.get(`http://localhost:5000/api/projects/` + projectId)
    .then(res => {
      const resProject = res.data.project;
      this.setState({project: resProject });
    })
  }
  render() {
    const from = this.props.location.state || '/projects'
    const { fireRedirect } = this.state;
    return (
        <div>
            <div className='alert-notification'></div>
            <div>
            <h1>Edit {this.state.project.name}</h1>
                <ProjectForm 
                    projectName={this.state.project.name}
                    description={this.state.project.description}
                    onInputChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                />
                { 
                    fireRedirect && (
                    <Redirect to={from || '/'} />
                )}
            </div>
        </div>
    )
  }
}
export default UpdateProject