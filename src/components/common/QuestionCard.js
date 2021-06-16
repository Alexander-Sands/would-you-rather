import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class QuestionCard extends Component {
  render() {
    const { name, avatarURL } = this.props.user
    const { id, optionOneText, optionTwoText } = this.props
    return (
        <Fragment>
            <div className="header">
                <h3>{name} / Asks </h3>
            </div>
            <div className="cont">
                <div className="img"> 
                    <img className="avatar" src={avatarURL} alt={`Avatar of ${name}`} />
                </div>
                <div className="option"> 
                    <h3>would you rather</h3>
                    <p>{optionOneText.text}</p>
                    <p>{optionTwoText.text}</p>
                    <Link className="poll" to={`/questions/${id}`} >View Poll</Link>
                </div>
            </div>
        </Fragment>
    )
  }
}


function mapStateToProps ({users, questions}, { id }) {
  const question = questions[id]
  const user = users[question.author]
  const optionOneText = question.optionOne
  const optionTwoText = question.optionTwo
  return {
    user,
    id,
    optionOneText,
    optionTwoText,
  }
}
  
export default connect(mapStateToProps)(QuestionCard) 