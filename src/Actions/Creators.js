import Types from './Types'

/* MESSAGES */
const getMessagesAttempt = (meta) => ({ type: Types.GET_MESSAGES_REQUEST, meta })
const getMessagesSuccess = (payload) => ({ type: Types.GET_MESSAGES_SUCCESS, payload })
const getMessagesFailure = (errorCode) => ({ type: Types.GET_MESSAGES_FAILURE, errorCode })

const updateMessagesAttempt = (meta) => ({ type: Types.UPDATE_MESSAGES_REQUEST, meta })
const updateMessagesSuccess = (payload) => ({ type: Types.UPDATE_MESSAGES_SUCCESS, payload })
const updateMessagesFailure = (errorCode) => ({ type: Types.UPDATE_MESSAGES_FAILURE, errorCode })

const addMessageAttempt = (meta) => ({ type: Types.ADD_MESSAGE_REQUEST, meta })
const addMessageFailure = (errorCode) => ({ type: Types.ADD_MESSAGE_FAILURE, errorCode })

const deleteMessageAttempt = (meta) => ({ type: Types.DELETE_MESSAGE_REQUEST, meta })
const deleteMessageFailure = (errorCode) => ({ type: Types.DELETE_MESSAGE_FAILURE, errorCode })

/**
 Makes available all the action creators we've created.
 */
export default {

  getMessagesAttempt,
  getMessagesSuccess,
  getMessagesFailure,

  updateMessagesAttempt,
  updateMessagesSuccess,
  updateMessagesFailure,

  addMessageAttempt,
  addMessageFailure,

  deleteMessageAttempt,
  deleteMessageFailure

}
