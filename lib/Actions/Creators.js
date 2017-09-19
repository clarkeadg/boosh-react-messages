'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Types = require('./Types');

var _Types2 = _interopRequireDefault(_Types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* MESSAGES */
var getMessagesAttempt = function getMessagesAttempt(meta) {
  return { type: _Types2.default.GET_MESSAGES_REQUEST, meta: meta };
};
var getMessagesSuccess = function getMessagesSuccess(payload) {
  return { type: _Types2.default.GET_MESSAGES_SUCCESS, payload: payload };
};
var getMessagesFailure = function getMessagesFailure(errorCode) {
  return { type: _Types2.default.GET_MESSAGES_FAILURE, errorCode: errorCode };
};

var updateMessagesAttempt = function updateMessagesAttempt(meta) {
  return { type: _Types2.default.UPDATE_MESSAGES_REQUEST, meta: meta };
};
var updateMessagesSuccess = function updateMessagesSuccess(payload) {
  return { type: _Types2.default.UPDATE_MESSAGES_SUCCESS, payload: payload };
};
var updateMessagesFailure = function updateMessagesFailure(errorCode) {
  return { type: _Types2.default.UPDATE_MESSAGES_FAILURE, errorCode: errorCode };
};

var addMessageAttempt = function addMessageAttempt(meta) {
  return { type: _Types2.default.ADD_MESSAGE_REQUEST, meta: meta };
};
var addMessageFailure = function addMessageFailure(errorCode) {
  return { type: _Types2.default.ADD_MESSAGE_FAILURE, errorCode: errorCode };
};

var deleteMessageAttempt = function deleteMessageAttempt(meta) {
  return { type: _Types2.default.DELETE_MESSAGE_REQUEST, meta: meta };
};
var deleteMessageFailure = function deleteMessageFailure(errorCode) {
  return { type: _Types2.default.DELETE_MESSAGE_FAILURE, errorCode: errorCode };
};

/**
 Makes available all the action creators we've created.
 */
exports.default = {

  getMessagesAttempt: getMessagesAttempt,
  getMessagesSuccess: getMessagesSuccess,
  getMessagesFailure: getMessagesFailure,

  updateMessagesAttempt: updateMessagesAttempt,
  updateMessagesSuccess: updateMessagesSuccess,
  updateMessagesFailure: updateMessagesFailure,

  addMessageAttempt: addMessageAttempt,
  addMessageFailure: addMessageFailure,

  deleteMessageAttempt: deleteMessageAttempt,
  deleteMessageFailure: deleteMessageFailure

};