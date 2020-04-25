import React from 'react';
import axios from 'axios';

import ProjectForm from './form';
import { Redirect } from 'react-router-dom';

class NewProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            fireRedirect: false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(target) {
        this.setState({
            ...this.state,
            [target.name]: target.value
        });
    }   
    
    handleSubmit(event) {
        const project = {
            name: this.state.name,
            description: this.state.description
        };
        axios.post(`http://localhost:5000/api/projects`, {project})
        .then(res => {
            this.setState({fireRedirect: true})
        });
        event.preventDefault();
    };
    render() {
        const from = this.props.location.state || '/projects'
        const { fireRedirect } = this.state;
        return (
            <div>
                <div className='alert-notification'></div>
                <h1>New Project</h1>
                <ProjectForm 
                    projectName={this.state.name}
                    description={this.state.description}
                    onInputChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                />
                { fireRedirect && (
                    <Redirect to={from || '/'} />
                )}
            </div>
    )}
};
export default NewProject