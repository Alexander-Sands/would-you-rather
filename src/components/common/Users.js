import React, { Component } from 'react'
import { connect } from 'react-redux'

class Users extends Component {
  render() {
    const { avatarURL, name, answers, questions } = this.props.user
    return (
        <div className="User">
            <div className="img">
              <img className="avatar" src={avatarURL} alt={`Avatar of ${name}`} />
            </div>
            <div className="info">
              <h3>{name}</h3>
              <p>Answered Questions <span>{Object.keys(answers).length}</span></p>
              <p>Created Questions <span>{Object.keys(questions).length}</span></p>
            </div>
            <div className="score">
              <h3>Score</h3>
              <div>
                <p>{Object.keys(answers).length + Object.keys(questions).length}</p>
              </div>
            </div>
        </div>
    )
  }
}


function mapStateToProps ({users}, { id }) {
  const user = users[id]
  return {
    user,
    id,
  }
}
  
export default connect(mapStateToProps)(Users) 