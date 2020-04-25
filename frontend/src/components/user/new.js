import React from 'react';
import axios from 'axios';
import config from 'react-global-configuration';
import UserForm from './partials/form';
import { Redirect } from 'react-router-dom';

class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            birthday: '',
            fireRedirect: false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCheckPhoneNumber = this.onCheckPhoneNumber.bind(this)
    }
    
    handleChange(target) {
        this.setState({
            ...this.state,
            [target.name]: target.value
        });
    }

    onCheckPhoneNumber(phoneNumber) {
        let regex = /\w/;
        // Phone can't contains string or length !== 10
        if (!regex.test(phoneNumber) || phoneNumber.length !== 10) {
            return false;
        }
        return true;
    }

    handleSubmit(event) {
        const user = this.state;
        if (this.onCheckPhoneNumber(user.phone)) {
            axios.post(`${config.get('BACKEND_API')}/api/users`, {user})
            .then(res => {
                this.setState({fireRedirect: true})
            }).catch(error => {
                alert(error.response.data.message)
            } );
        } else {
            alert("Phone number is incorrect");
        }
        event.preventDefault();
    }

    render() {
        const from = this.props.location.state || '/users'
        const { fireRedirect } = this.state;
        return (
            <div>
                <div className='alert-notification'></div>
                <h1>New User</h1>
                <h2>{this.props.location.state}</h2>
                <h2>{from}</h2>
                <UserForm 
                    username={this.state.name}
                    phone={this.state.phone}
                    birthday={this.state.birthday}
                    onInputChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                />
                { fireRedirect && (
                    <Redirect to={from || '/'} />
                )}
            </div>
        )
    }
}
export default NewUser