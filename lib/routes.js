'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Compose = require('./Containers/Compose');

var _Compose2 = _interopRequireDefault(_Compose);

var _Inbox = require('./Containers/Inbox');

var _Inbox2 = _interopRequireDefault(_Inbox);

var _Sent = require('./Containers/Sent');

var _Sent2 = _interopRequireDefault(_Sent);

var _Message = require('./Containers/Message');

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var routes = _react2.default.createElement(
    _reactRouter.Route,
    { path: '' },
    _react2.default.createElement(_reactRouter.Route, { path: 'messages/compose/:userId', component: _Compose2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'messages/inbox', component: _Inbox2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'messages/inbox/:pageNumber', component: _Inbox2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'messages/sent', component: _Sent2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'messages/sent/:pageNumber', component: _Sent2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'message/:messageId', component: _Message2.default })
  );
  return routes;
};