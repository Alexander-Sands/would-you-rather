import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../../actions/questions'

class NewQuestion extends Component {
  state = {
    Option1: '',
    Option2: '',
  }
  handleChange = (e, Option) => {
    const text = e.target.value
    if (Option === "Option1") {this.setState(() => ({ Option1: text }))}
    if (Option === "Option2") {this.setState(() => ({ Option2: text }))}
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { Option1, Option2 } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(Option1, Option2))

    this.setState(() => ({
      Option1: '',
      Option2: ''
    }))
    
  }
  render() {
    const { Option1, Option2 } = this.state
    return (
      <div className="NewQuestion">
        <div className="container">
          <div className="box">
            <div className="header">
              <h3>Create New Question</h3>
            </div>
            <form className="cont" onSubmit={this.handleSubmit}>
              <p>Complete the question:</p>
              <h3>Would you rather ...</h3>
              <input type="text" value={Option1} placeholder="Enter Option One Text Here" onChange={(e) => this.handleChange(e, "Option1")} maxLength={50} />
              <p className="hr"></p>
              <input type="text" value={Option2} placeholder="Enter Option Two Text Here" onChange={(e) => this.handleChange(e,"Option2")} maxLength={50} />
              <button className="submit" type="submit" disabled={((Option1 === '') || (Option2 === ''))} >Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(NewQuestion)