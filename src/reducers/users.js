import { RECEIVE_USERS, ADD_ANSWER_U, ADD_QUESTION_U } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case ADD_ANSWER_U:
      const {authedUser, qid, answer} = action
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }
    case ADD_QUESTION_U:
      const { id, author } = action
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id)
        }
      }
    default :
      return state

  }
}
