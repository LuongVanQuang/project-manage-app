import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import config from 'react-global-configuration';
import ProjectForm from './partials/form';

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
        axios.post(`${config.get('BACKEND_API')}/api/projects`, {project})
        .then(res => {
            this.setState({fireRedirect: true})
        }).catch((e) => {
            alert(e.response.data.message)
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