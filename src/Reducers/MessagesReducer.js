import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

let collections = {};

export const INITIAL_STATE = Immutable({
  entities: {},
  result: [],
  collections: collections,
  errorCode: null,
  attempting: false
})

// request
const attempt = (state, action) =>
  state.merge({ attempting: true })

// recieve
const success = (state, action) => {

  let path = '';
  if (action.payload.path) {
    path = action.payload.path.replace(/\//g,'');
    if (!collections[path]) collections[path] = {};
    collections[path].result = action.payload.result;
    collections[path].count = action.payload.count || 0;
    collections[path].attempting = false;
  }

  return state.merge({
    attempting: false,
    errorCode: null,
    entities: state.entities.merge(action.payload.entities.messages),
    result: action.payload.result,
    collections: collections
  })
}

// fail
const failure = (state, action) =>
  state.merge({ attempting: false, errorCode: action.errorCode })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GET_MESSAGES_REQUEST]: attempt,
  [Types.GET_MESSAGES_SUCCESS]: success,
  [Types.GET_MESSAGES_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
