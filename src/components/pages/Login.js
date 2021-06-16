import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { setAuthedUser } from '../../actions/authedUser'

class Login extends Component {
  singin = () => {
    const authedUser = document.getElementById('sing').value
    const { dispatch } = this.props
    if (authedUser !== "sing-in") dispatch(setAuthedUser(authedUser))
  }
  render() {
    return (
      <div className="Login">
        <div className="container">
          <div className="box">
            <div className="contents">
              <div className="content">
                <div className="header">
                  <h3>Welcome to Would You Rather App!</h3>
                  <p>Please sign in to continue.</p>
                </div>
                <div className="cont">
                  <div className="img">
                    <img src="https://miro.medium.com/max/2920/1*KDqH7Qu37OFzXpuQKr2NKw.png"  alt="logo"/>
                  </div>
                  <h3>Sign In</h3>
                  <form className="custom-select">
                    <select id="sing" >
                      <option value="sing-in" >Sing In</option>
                      {this.props.usersId.map((id) => (
                          <option key={id} value={id}>{this.props.users[id].name}</option>
                      ))}
                    </select>
                  </form>
                  <Link className="sign" to='/' onClick={this.singin}>Sign In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
    return {
        usersId: Object.keys(users),
        users,
    }
}
  
export default connect(mapStateToProps)(Login)