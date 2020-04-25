import React from 'react'
//import { Link } from 'react-router-dom';
import HomeRouter from './homeRoutes.js'
import {Container} from 'react-bootstrap'

class Home extends React.Component {
    render() {
        return (
            <Container>
                <h2>Welcome Home!</h2>
                <HomeRouter />
            </Container>
        )
    }
}
export default Home