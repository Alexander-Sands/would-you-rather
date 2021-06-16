import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionCard from '../common/QuestionCard'

class Home extends Component {
  state = {
    screen: 'Unanswered'
  }
  onChangeTap = (e, screen) => {
    document.querySelector('.selected').classList.remove("selected")
    e.classList.add('selected')
    this.setState(() => ({screen}))
  }
  render() {
    return (
      <div className="Questions">
        <div className="container">
          <div className="box">
              <div className="tabes">
                <div className="tabe selected" onClick={(e) => this.onChangeTap(e.target, 'Unanswered')}>Unanswered Question</div>
                <div className="tabe" onClick={(e) => this.onChangeTap(e.target, 'Answered')}>Answered Question</div>
              </div>
              <div className="cards">
                {this.state.screen === 'Unanswered' && (
                    <ul className="content">
                      {this.props.unanswered.map((id) => (
                          <li key={id}>
                              <QuestionCard id={id} />
                          </li>
                      ))}
                    </ul>
                  )}
                  {this.state.screen === 'Answered' && (
                    <ul className="content">
                      {this.props.answered.map((id) => (
                          <li key={id}>
                              <QuestionCard id={id} />
                          </li>
                      ))}
                    </ul>
                  )}
              </div>       
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users, questions, authedUser }) {
    let questionsID = Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    
      let unanswered = questionsID.filter((id) => {
        return ( 
          (questions[id].optionOne.votes.indexOf(authedUser) === -1) && 
          (questions[id].optionTwo.votes.indexOf(authedUser) === -1)
      )})

    let answered = Object.keys(users[authedUser].answers)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
      
    return {
        unanswered,
        answered,
    }
}
  
export default connect(mapStateToProps)(Home) 