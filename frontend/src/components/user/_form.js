import React from 'react'
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
            <form onSubmit={this.props.onSubmit}>
                <label>
                    Name:
                    <input type="text" name='name' value={this.props.username || ''} onChange={this.handleInputChange} />
                </label>
                <label>
                    Phone:
                    <input type="text" name='phone'  value={this.props.phone || ''} onChange={this.handleInputChange} />
                </label>
                <label>
                    Birthday:
                    <input type="text" name='birthday'  value={this.props.birthday || ''} onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )};
};
export default UserForm;