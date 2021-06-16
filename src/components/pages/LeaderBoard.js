import React, { Component } from 'react'
import { connect } from 'react-redux'
import Users from '../common/Users'

class LeaderBoard extends Component {
  onChangeTap = () => {
    
  }
  render() {
    return (
      <div className="LeaderBoard">
        <div className="container">
          <div className="box">
              <ul>
                  {this.props.usersID.map((id) => (
                      <li key={id}>
                          <Users id={id} />
                      </li>
                  ))}
              </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({users}) {

    return {
      usersID: Object.keys(users).sort(
          (a,b) => 
          (Object.keys(users[b].questions).length + Object.keys(users[b].answers).length) 
          - 
          (Object.keys(users[a].questions).length + Object.keys(users[a].answers).length)
      )
    }
}
    
export default connect(mapStateToProps)(LeaderBoard) 