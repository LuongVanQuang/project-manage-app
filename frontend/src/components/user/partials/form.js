
import React from 'react';
import {Form, Button} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class UserForm extends React.Component {
    constructor(props) {
        super(props);
            
        this.state = {
            birthday: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatetimeSelect = this.handleDatetimeSelect.bind(this)
    }
    
    handleInputChange(event) {
        this.props.onInputChange(event.target)
    }

    handleDatetimeSelect(event) {
        this.setState({
            birthday: event
        }, () => {
            let birthday = {target: {name: 'birthday', value: this.state.birthday}};
            this.handleInputChange(birthday);
        });
    };

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
                <Form.Group controlId="formBasicBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <DatePicker
                            selected={this.props.birthday || ''}
                            onChange={this.handleDatetimeSelect}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            name='datetime'
                            timeCaption="time"
                            dateFormat="yyyy-MM-dd HH:ii:ss'"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )};
};
export default UserForm;