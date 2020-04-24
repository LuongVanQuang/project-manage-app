import React from 'react'
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
            <form onSubmit={this.props.onSubmit}>
                <label>
                    Name:
                    <input type="text" name='name' value={this.props.projectName || ''} onChange={this.handleInputChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name='description'  value={this.props.description || ''} onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )};
};
export default ProjectForm;