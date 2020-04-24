import React from 'react';
import axios from 'axios';

import UserForm from './_form';
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
      }
    
      handleChange(target) {
        this.setState({
            ...this.state,
            [target.name]: target.value
    });
      }
      handleSubmit(event) {
        const user = this.state;
        axios.post(`http://localhost:5000/api/users/create`, {user})
          .then(res => {
              this.setState({fireRedirect: true})
        });
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