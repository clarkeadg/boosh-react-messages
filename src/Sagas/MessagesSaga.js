import { take, put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { normalize, arrayOf } from 'normalizr'

import { PaginationActions } from 'boosh-react-pagination'
import { UsersActions } from 'boosh-react-users'
import { redirect } from 'boosh-react-auth'

/* SCHEMAS */
import MessageSchema from '../Schemas/MessageSchema'

export default (api) => {

  function * attemptGetMessages (meta) {

    // for takeEvery
    meta = meta.meta;

    // for new pagination
    let query = meta.query ? meta.query : meta;
    let path = meta.path ? meta.path : "/messages/"; 

    // make the call to the api
    const response = yield call(api.getMessages, query)

    console.log('GOT MESSAGES',response.data)

    // success?
    if (response && response.ok) {

      let count = response.data.meta.pagination.total;
      let data = response.data.data;

      if (data.length) {

        let payload = normalize(data, arrayOf(MessageSchema));
        if (!payload.result.length) {
          payload.entities.messages = {};
        }

        console.log('MESSAGES PAYLOAD', payload)

        //payload.entities.users = Object.assign(payload.entities.from, payload.entities.to)           

        payload.query = query;
        payload.path = path;
        payload.count = count;

        //console.log('NORMALIZED DATA', payload)     
        
        //yield put(UsersActions.getUsersSuccess(payload))
        yield put(Actions.getMessagesSuccess(payload))

      }

    } else {
      yield put(Actions.getMessagesFailure(response.data))
    }
  }

  function * attemptAddMessage(meta) {

    // make the call to the api
    const response = yield call(api.addMessage, meta)

    console.log('ADD MESSAGE RESPONSE', response, meta)

    // success?
    if (response && response.ok) {

      redirect('/history');      

      //yield put(Actions.getMessagesAttempt({item_type: meta.item_type, item_id: meta.item_id}));
    } else {
      yield put(Actions.addMessageFailure(response.data))
    }
  }

  function * watchGetMessagesAttempt () {
    yield takeEvery(Types.GET_MESSAGES_REQUEST, attemptGetMessages)
    // daemonize
    /*while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.GET_MESSAGES_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptGetMessages, meta)
    }*/
  }

  function * watchAddMessageAttempt () {
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.ADD_MESSAGE_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptAddMessage, meta)
    }
  }

  function * attemptUpdateMessages (meta) {

    console.log('attemptUpdateMessages', meta)

    let query = meta.meta; 

    // make the call to the api
    let response;
    
    if (query.read) {
      response = yield call(api.updateMessages, query.id, { read: query.read });
    }
    if (query.deleted_at) {
      response = yield call(api.updateMessages, query.id, { deleted_at: query.deleted_at });
    }

    console.log('UPDATE MESSAGES RESPONSE',response.data)

    // success?
    if (response && response.ok) {

      yield put(UsersActions.getUserStatusAttempt({
        id: query.user_id
      }));
      
    } else {
      //yield put(Actions.updateNotificationsFailure(response.data))
    }
  }

  function * watchUpdateMessagesAttempt () {
    yield takeEvery(Types.UPDATE_MESSAGES_REQUEST, attemptUpdateMessages)
  }

  return {
    watchGetMessagesAttempt,
    watchAddMessageAttempt,
    watchUpdateMessagesAttempt,
    attemptGetMessages,
    attemptAddMessage,
    attemptUpdateMessages
  }
}
