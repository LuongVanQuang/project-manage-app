import React from 'react'
class Project extends React.Component {
  render() {
    return <h1>Project: {this.props.match.params.id}</h1>
  }
}
export default Project