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

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _MessagesSelector = require('../Selectors/MessagesSelector');

var _reactFoundation = require('react-foundation');

var _booshReactComponents = require('boosh-react-components');

var _booshReactUsers = require('boosh-react-users');

var _reactRouter = require('react-router');

var _Message = require('../Components/Message/Message');

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Collections */
//import MessagesCollection from '../Collections/MessagesCollection'

/*
<div className="message">
  <User user={from}/>
  <div className="title">{ message.title}</div>
  <div className="content">{ message.content}</div>
</div>
*/

/* Selectors */

/* React */
var MessageContainer = function (_React$Component) {
  (0, _inherits3.default)(MessageContainer, _React$Component);

  function MessageContainer() {
    (0, _classCallCheck3.default)(this, MessageContainer);
    return (0, _possibleConstructorReturn3.default)(this, (MessageContainer.__proto__ || (0, _getPrototypeOf2.default)(MessageContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(MessageContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getData();
    }
  }, {
    key: 'getData',
    value: function getData() {
      var Meta = {
        id: this.props.params.messageId
      };
      this.props.dispatch(_Creators2.default.getMessagesAttempt(Meta));
    }
  }, {
    key: 'renderMessage',
    value: function renderMessage(loading, message) {
      if (loading) {
        return _react2.default.createElement(_booshReactComponents.Loading, null);
      }
      return _react2.default.createElement(_Message2.default, { full: true, message: message, user_id: message.from_id });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          message = _props.message,
          loading = _props.loading;


      console.log('MESSAGE', message);

      return _react2.default.createElement(
        'div',
        { className: 'messages' },
        _react2.default.createElement(
          _reactFoundation.Row,
          { className: 'display' },
          _react2.default.createElement(
            _reactFoundation.Column,
            { small: 12, medium: 3 },
            _react2.default.createElement(_booshReactComponents.Portlet, { title: '', items: _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_booshReactComponents.Nav, { isVertical: true, items: [{ "title": "Inbox", "url": "/messages/inbox" }, { "title": "Sent", "url": "/messages/sent" }] })
              ) })
          ),
          _react2.default.createElement(
            _reactFoundation.Column,
            { small: 12, medium: 9 },
            _react2.default.createElement(_booshReactComponents.Portlet, { title: 'Messages', items: _react2.default.createElement(
                'div',
                { className: 'messages' },
                this.renderMessage(loading, message)
              ) })
          )
        )
      );
    }
  }]);
  return MessageContainer;
}(_react2.default.Component);

/* Components */


/* Actions */


MessageContainer.propTypes = {
  loading: _react2.default.PropTypes.bool,
  message: _react2.default.PropTypes.object
};

MessageContainer.defaultProps = {
  loading: true,
  message: {}
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.messages.attempting,
    message: (0, _MessagesSelector.getMessageById)(state, props)
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MessageContainer);