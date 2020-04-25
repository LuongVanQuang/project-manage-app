
import React from 'react';
import {Form, Button} from 'react-bootstrap';

class UserForm extends React.Component {
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
                        value={this.props.username || ''} 
                        onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter phone"
                        name='phone' 
                        value={this.props.phone || ''} 
                        onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control 
                        type="text" 
                        name='birthday' 
                        value={this.props.birthday || ''} 
                        onChange={this.handleInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )};
};
export default UserForm;