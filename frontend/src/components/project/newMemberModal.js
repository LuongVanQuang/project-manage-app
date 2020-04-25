import React from 'react';
import axios from 'axios';
import {Button, Modal, Form} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";;

class MyVerticallyCenteredModal extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        this.props.onSelected(event.target.getAttribute('user_id'))
    }


    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onChangeModalState}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Assign new user
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="groupUsers">
                            <Form.Label>Select users</Form.Label>
                            <Form.Control as="select" multiple>
                            {
                                this.props.users.map((user) => {
                                    return (
                                        <option 
                                            key={user.id} 
                                            user_id={user.id} 
                                            onClick={ this.handleClick }>
                                                {user.name}
                                        </option>
                                    )
    
                                })
                            }
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ this.props.onChangeModalState }>Close</Button>
                    <Button onClick={ this.props.onSave }>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

class NewMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalState: false,
            users: [],
            selected: [],
        }
        this.changeModalState = this.changeModalState.bind(this);
        this.onSave = this.onSave.bind(this)
        this.onSelectedUser = this.onSelectedUser.bind(this)
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/users/`)
        .then(res => {
            const users = res.data.users;
            this.setState({ users: users });
        })
    }

    changeModalState() {
        this.setState({modalState: !this.state.modalState})
    }

    onSave(event) {
        const memberIds = this.state.selected;
        const projectId = this.props.project_id;
        const projectMembers = {memberIds: memberIds, projectId: projectId}
        axios.post(`http://localhost:5000/api/projects/members`, {projectMembers})
        .then(res => {
            window.location.reload();
        });
        this.changeModalState();
        event.preventDefault();
    }

    onSelectedUser(value) {
        this.setState( prevState => ({selected: [...prevState.selected, value]}));
    }

    render() {
        const project_id = this.props.project_id;
        return (
            <>
            <Button variant="primary" onClick={this.changeModalState}>
                Assign new user
            </Button>
    
            <MyVerticallyCenteredModal
                show={this.state.modalState}
                project_id={project_id}
                users={this.state.users}
                onSelected={this.onSelectedUser}
                onSave={this.onSave}
                onChangeModalState={this.changeModalState}
            />
            </>
        )
    }
}
  
export default NewMember