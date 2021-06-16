import { addAnswerU, addQuestionU } from './users'
import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER_Q = 'ADD_ANSWER_Q'
export const ADD_QUESTION_Q = 'ADD_QUESTION_Q'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addAnswerQ ({authedUser, qid, answer}) {
  return {
    type: ADD_ANSWER_Q,
    authedUser,
    qid,
    answer
  }
}

function addQuestionQ (question) {
  return {
    type: ADD_QUESTION_Q,
    question,
  }
}

// ************************************
export function handleSaveAnswer(info) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(addAnswerU(info))
    dispatch(addAnswerQ(info))

    return saveQuestionAnswer(info)
      .then(() => dispatch(hideLoading()))
      .catch((e) => {
      console.warn('Error in handleSaveQuestionAnswer:', e)
    })
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText
    }).then((question) => {
        dispatch(addQuestionQ(question))
        dispatch(addQuestionU(question))
    }).then(() => dispatch(hideLoading()))
  }
}
// ***********************************