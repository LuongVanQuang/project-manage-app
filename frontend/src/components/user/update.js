import React from 'react';
//import { Link} from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import UserForm from './form';

class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      fireRedirect: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(target) {
    //const stateChange = this.state.user[target.name];
    this.setState(prevState => ({
      user: {
          ...prevState.user,
          [target.name]: target.value
      }
  })
  )
}
  handleSubmit(event) {
    const user = this.state.user;
    axios.put(`http://localhost:5000/api/users/${user.id}` , {user})
      .then(res => {
          this.setState({fireRedirect: true})
    });
    event.preventDefault();

  }
  componentDidMount() {
    const userId = this.props.match.params.id
    axios.get(`http://localhost:5000/api/users/` + userId)
    .then(res => {
      const user = res.data.user;
      this.setState({user: user });
    })
  }
  render() {
    const from = this.props.location.state || '/users'
    const { fireRedirect } = this.state;
    return (
        <div>
            <div className='alert-notification'></div>
            <div>
            <h1>Edit {this.state.user.name}</h1>
              <UserForm 
                  username={this.state.user.name}
                  phone={this.state.user.phone}
                  birthday={this.state.user.birthday}
                  onInputChange={this.handleChange}
                  onSubmit={this.handleSubmit}
              />
              { fireRedirect && (
                  <Redirect to={from || '/'} />
              )}
          </div>
        </div>
    )
  }
}
export default UpdateUser