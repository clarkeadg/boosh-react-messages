'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _booshReactUsers = require('boosh-react-users');

var _reactFoundation = require('react-foundation');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Components */


/* Actions */

/* React */
var MessageButton = function (_React$Component) {
  (0, _inherits3.default)(MessageButton, _React$Component);

  function MessageButton() {
    (0, _classCallCheck3.default)(this, MessageButton);
    return (0, _possibleConstructorReturn3.default)(this, (MessageButton.__proto__ || (0, _getPrototypeOf2.default)(MessageButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(MessageButton, [{
    key: 'render',
    value: function render() {
      var user = this.props.user;

      if (!user) return false;

      return _react2.default.createElement(
        _reactRouter.Link,
        { className: 'btn-message', to: "/messages/compose/" + user.id },
        _react2.default.createElement(
          _reactFoundation.Button,
          null,
          _react2.default.createElement(_reactFoundation.Icon, { name: 'fi-mail' }),
          'Send ',
          user.username,
          ' a Message'
        )
      );
    }
  }]);
  return MessageButton;
}(_react2.default.Component);

/* Selectors */


var mapStateToProps = function mapStateToProps(state, props) {
  return {
    user: (0, _booshReactUsers.getUserById)(state, props)
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MessageButton);