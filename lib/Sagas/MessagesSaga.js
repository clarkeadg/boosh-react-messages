'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _Types = require('../Actions/Types');

var _Types2 = _interopRequireDefault(_Types);

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _normalizr = require('normalizr');

var _booshReactPagination = require('boosh-react-pagination');

var _booshReactUsers = require('boosh-react-users');

var _booshReactAuth = require('boosh-react-auth');

var _MessageSchema = require('../Schemas/MessageSchema');

var _MessageSchema2 = _interopRequireDefault(_MessageSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (api) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(attemptGetMessages),
      _marked2 = /*#__PURE__*/_regenerator2.default.mark(attemptAddMessage),
      _marked3 = /*#__PURE__*/_regenerator2.default.mark(watchGetMessagesAttempt),
      _marked4 = /*#__PURE__*/_regenerator2.default.mark(watchAddMessageAttempt),
      _marked5 = /*#__PURE__*/_regenerator2.default.mark(attemptUpdateMessages),
      _marked6 = /*#__PURE__*/_regenerator2.default.mark(watchUpdateMessagesAttempt);

  function attemptGetMessages(meta) {
    var query, path, response, count, data, payload;
    return _regenerator2.default.wrap(function attemptGetMessages$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            // for takeEvery
            meta = meta.meta;

            // for new pagination
            query = meta.query ? meta.query : meta;
            path = meta.path ? meta.path : "/messages/";

            // make the call to the api

            _context.next = 5;
            return (0, _effects.call)(api.getMessages, query);

          case 5:
            response = _context.sent;


            console.log('GOT MESSAGES', response.data);

            // success?

            if (!(response && response.ok)) {
              _context.next = 21;
              break;
            }

            count = response.data.meta.pagination.total;
            data = response.data.data;

            if (!data.length) {
              _context.next = 19;
              break;
            }

            payload = (0, _normalizr.normalize)(data, (0, _normalizr.arrayOf)(_MessageSchema2.default));

            if (!payload.result.length) {
              payload.entities.messages = {};
            }

            console.log('MESSAGES PAYLOAD', payload);

            //payload.entities.users = Object.assign(payload.entities.from, payload.entities.to)           

            payload.query = query;
            payload.path = path;
            payload.count = count;

            //console.log('NORMALIZED DATA', payload)     

            //yield put(UsersActions.getUsersSuccess(payload))
            _context.next = 19;
            return (0, _effects.put)(_Creators2.default.getMessagesSuccess(payload));

          case 19:
            _context.next = 23;
            break;

          case 21:
            _context.next = 23;
            return (0, _effects.put)(_Creators2.default.getMessagesFailure(response.data));

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }

  function attemptAddMessage(meta) {
    var response;
    return _regenerator2.default.wrap(function attemptAddMessage$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.call)(api.addMessage, meta);

          case 2:
            response = _context2.sent;


            console.log('ADD MESSAGE RESPONSE', response, meta);

            // success?

            if (!(response && response.ok)) {
              _context2.next = 8;
              break;
            }

            (0, _booshReactAuth.redirect)('/history');

            //yield put(Actions.getMessagesAttempt({item_type: meta.item_type, item_id: meta.item_id}));
            _context2.next = 10;
            break;

          case 8:
            _context2.next = 10;
            return (0, _effects.put)(_Creators2.default.addMessageFailure(response.data));

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked2, this);
  }

  function watchGetMessagesAttempt() {
    return _regenerator2.default.wrap(function watchGetMessagesAttempt$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _reduxSaga.takeEvery)(_Types2.default.GET_MESSAGES_REQUEST, attemptGetMessages);

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked3, this);
  }

  function watchAddMessageAttempt() {
    var _ref, meta;

    return _regenerator2.default.wrap(function watchAddMessageAttempt$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!true) {
              _context4.next = 9;
              break;
            }

            _context4.next = 3;
            return (0, _effects.take)(_Types2.default.ADD_MESSAGE_REQUEST);

          case 3:
            _ref = _context4.sent;
            meta = _ref.meta;
            _context4.next = 7;
            return (0, _effects.call)(attemptAddMessage, meta);

          case 7:
            _context4.next = 0;
            break;

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _marked4, this);
  }

  function attemptUpdateMessages(meta) {
    var query, response;
    return _regenerator2.default.wrap(function attemptUpdateMessages$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:

            console.log('attemptUpdateMessages', meta);

            query = meta.meta;

            // make the call to the api

            response = void 0;

            if (!query.read) {
              _context5.next = 7;
              break;
            }

            _context5.next = 6;
            return (0, _effects.call)(api.updateMessages, query.id, { read: query.read });

          case 6:
            response = _context5.sent;

          case 7:
            if (!query.deleted_at) {
              _context5.next = 11;
              break;
            }

            _context5.next = 10;
            return (0, _effects.call)(api.updateMessages, query.id, { deleted_at: query.deleted_at });

          case 10:
            response = _context5.sent;

          case 11:

            console.log('UPDATE MESSAGES RESPONSE', response.data);

            // success?

            if (!(response && response.ok)) {
              _context5.next = 17;
              break;
            }

            _context5.next = 15;
            return (0, _effects.put)(_booshReactUsers.UsersActions.getUserStatusAttempt({
              id: query.user_id
            }));

          case 15:
            _context5.next = 17;
            break;

          case 17:
          case 'end':
            return _context5.stop();
        }
      }
    }, _marked5, this);
  }

  function watchUpdateMessagesAttempt() {
    return _regenerator2.default.wrap(function watchUpdateMessagesAttempt$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _reduxSaga.takeEvery)(_Types2.default.UPDATE_MESSAGES_REQUEST, attemptUpdateMessages);

          case 2:
          case 'end':
            return _context6.stop();
        }
      }
    }, _marked6, this);
  }

  return {
    watchGetMessagesAttempt: watchGetMessagesAttempt,
    watchAddMessageAttempt: watchAddMessageAttempt,
    watchUpdateMessagesAttempt: watchUpdateMessagesAttempt,
    attemptGetMessages: attemptGetMessages,
    attemptAddMessage: attemptAddMessage,
    attemptUpdateMessages: attemptUpdateMessages
  };
};

/* SCHEMAS */