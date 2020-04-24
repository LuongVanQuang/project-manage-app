import React from 'react'
//import { Link } from 'react-router-dom';
import HomeRouter from './homeRoutes.js'

class Home extends React.Component {
  render() {
      return (
         <div>
             <h2>Welcome Home!</h2>
            <HomeRouter />
        </div> 
      )
  }
}
export default Home