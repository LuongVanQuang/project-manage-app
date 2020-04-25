import React from 'react'
import {Form, Button} from 'react-bootstrap'
class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
            
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
        this.props.onInputChange(event.target)
    }

    render() {
        return (
            <Form onSubmit={this.props.onSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter name"
                        name='name' 
                        value={this.props.projectName || ''} 
                        onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter description"
                        name='description' 
                        value={this.props.description || ''} 
                        onChange={this.handleInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )};
};
export default ProjectForm;