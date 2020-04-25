import React from 'react'
import { NavLink } from 'react-router-dom';
import NavRoute from './navRoutes'
import { Container, Navbar, Nav } from 'react-bootstrap';

class Navigation extends React.Component {
    render() {
        return (
            <Container>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink exact activeClassName="active" to='/'>Home</NavLink>
                            <NavLink activeClassName="active" to='/users'>Users</NavLink>
                            <NavLink activeClassName="active"to='/projects'>Project</NavLink>
                        </Nav>
                    </Navbar.Collapse> 
                </Navbar>
                <NavRoute />
            </Container>
        )
    }
}
export default Navigation
