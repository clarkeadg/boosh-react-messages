'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessageById = exports.getVisibleMessages = exports.getMessagesCollection = undefined;

var _reselect = require('reselect');

/* Private */

var allMessages = function allMessages(state, props) {
  return state.messages;
};

var path = function path(state, props) {
  return props.path ? props.path.replace(/\//g, '') : 'messages';
};

var messageId = function messageId(state, props) {
  return props.params.messageId;
};

/* Export */

var getMessagesCollection = exports.getMessagesCollection = (0, _reselect.createSelector)([allMessages, path], function (messages, key) {
  var collection = {
    items: [],
    count: 0
  };
  if (!messages.collections[key]) return collection;
  collection.count = messages.collections[key].count;
  collection.items = messages.collections[key].result.map(function (id) {
    return messages.entities[id];
  });
  return collection;
});

var getVisibleMessages = exports.getVisibleMessages = (0, _reselect.createSelector)([allMessages], function (messages) {
  return messages.result.map(function (id) {
    return messages.entities[id];
  });
});

var getMessageById = exports.getMessageById = (0, _reselect.createSelector)([allMessages, messageId], function (messages, id) {
  return messages.entities[id];
});