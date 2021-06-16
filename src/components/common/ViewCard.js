import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../../actions/questions'
import NotFound from './NotFound'

class QuestionPage extends Component {
    state = {
        option: ''
    }
    handleChange = (e) => {
        this.setState({
          option: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        
        const { dispatch, authedUser, qid } = this.props
        const answer = this.state.option 
        
        if (answer !== "") {
            dispatch(handleSaveAnswer({authedUser, qid, answer}))
        } else {
            alert('Please choose one from the Options.')
        }
    
      }
  render() {
    let { name, avatarURL } = this.props.user
    let { authedUser, optionOne, optionTwo, question } = this.props

    if (question === null) return <NotFound />

    let ChckOptionOne = (optionOne.votes.indexOf(authedUser) === -1)
    let ChckOptionTwo = (optionTwo.votes.indexOf(authedUser) === -1)
    
    let VotesOptionOne = optionOne.votes.length
    let VotesOptionTwo = optionTwo.votes.length
    let Votes = VotesOptionOne + VotesOptionTwo

    return (
        <div className="viewcard">
            <div className="container">
                {(ChckOptionOne && ChckOptionTwo ) ? (
                    <div className="box">
                        <div className="header">
                            <h3>{name} / Asks</h3>
                        </div>
                        <div className="cont">
                            <div className="img"> 
                                <img className="avatar" src={avatarURL} alt={`Avatar of ${name}`} />
                            </div>
                            <form className="option" onSubmit={(e) => this.handleSubmit(e)}> 
                                <h3>would you rather ...</h3>
                                <div>
                                    <input id="r1" name="option" type="radio" 
                                    checked={this.state.option === "optionOne"}
                                    value="optionOne"
                                    onChange={this.handleChange} />
                                    <label htmlFor="r1">{optionOne.text}</label>
                                </div>
                                <div>
                                    <input id="r2" name="option" type="radio" 
                                    checked={this.state.option === "optionTwo"}
                                    value="optionTwo" onChange={this.handleChange}/>
                                    <label htmlFor="r2">{optionTwo.text}</label>
                                </div>
                                <button className="poll" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                ) : 
                (
                    <div className="box">
                        <div className="header">
                            <h3>Asksed by / {name}</h3>
                        </div>
                        <div className="cont">
                            <div className="img"> 
                                <img className="avatar" src={avatarURL} alt={`Avatar of ${name}`} />
                            </div>
                            <div className="results" onSubmit={(e) => this.handleSubmit(e)}> 
                                <h3>Results: </h3>
                                <div id="opt1" className="opt slected"  >
                                    {(ChckOptionOne) ? "" 
                                        : 
                                        <p className="slected"></p>
                                    }
                                    

                                    <p className="text">would you rather {optionOne.text}?</p>  

                                    <div className="progress">
                                        <div className="progress-bar" style={{width: ((VotesOptionOne * 100 / Votes)+ '%')}}>
                                        {(VotesOptionOne * 100 / Votes).toFixed(1)}%</div>
                                    </div>
                                    
                                    <p className="votes">{VotesOptionOne} out of {Votes} votes</p>
                                </div>
                                <div id="opt2" className="opt"  >
                                    {(ChckOptionTwo) ? "" 
                                        : 
                                        <p className="slected"></p>
                                    }

                                    <p className="text">would you rather {optionTwo.text}?</p>  

                                    <div className="progress">
                                        <div className="progress-bar" style={{width: ((VotesOptionTwo * 100 / Votes)+ '%')}}>
                                        {(VotesOptionTwo * 100 / Votes).toFixed(1)}%</div>
                                    </div>
                                    
                                    <p className="votes">{VotesOptionTwo} out of {Votes} votes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
    
    const { id } = props.match.params
    
    const question = questions[id] ? questions[id] : null
    const user = question ? users[question.author] : ""
    
    const optionOne = question ? question.optionOne : ""
    const optionTwo = question ? question.optionTwo : ""

    return {
      authedUser,
      qid: id,
      user,
      optionOne,
      optionTwo,
      question
  }
}

export default connect(mapStateToProps)(QuestionPage)

