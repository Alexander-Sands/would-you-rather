export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWER_U = 'ADD_ANSWER_U';
export const ADD_QUESTION_U = 'ADD_QUESTION_U';

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addAnswerU({authedUser, qid, answer}) {
  return {
    type: ADD_ANSWER_U,
    authedUser,
    qid,
    answer
  }
}

export function addQuestionU(question) {
  let id = question.id 
  let author = question.author 
  return {
    type: ADD_QUESTION_U,
    id,
    author
  }
}