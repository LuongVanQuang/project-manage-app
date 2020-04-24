import React from 'react';
import { Link} from 'react-router-dom';

class Users extends React.Component {
  render() {
    //let {url} = this.props.match;
    return (
        <div>
            <h1>Users</h1>
            <ul>
                <li>
                    <Link to='/users/123'>User 1</Link>
                </li>
            </ul>
        </div>
    )
  }
}
export default Users