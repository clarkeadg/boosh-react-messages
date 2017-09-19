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

var _Creators = require('../../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _reactFoundation = require('react-foundation');

var _booshReactComponents = require('boosh-react-components');

var _booshReactAuth = require('boosh-react-auth');

var _booshReactUsers = require('boosh-react-users');

var _reactRouter = require('react-router');

var _reactRemarkable = require('react-remarkable');

var _reactRemarkable2 = _interopRequireDefault(_reactRemarkable);

var _MessagesSelector = require('../../Selectors/MessagesSelector');

var _AddMessageForm = require('./../../Forms/AddMessageForm');

var _AddMessageForm2 = _interopRequireDefault(_AddMessageForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* React */
var Message = function (_React$Component) {
  (0, _inherits3.default)(Message, _React$Component);

  function Message() {
    (0, _classCallCheck3.default)(this, Message);
    return (0, _possibleConstructorReturn3.default)(this, (Message.__proto__ || (0, _getPrototypeOf2.default)(Message)).apply(this, arguments));
  }

  (0, _createClass3.default)(Message, [{
    key: 'addViewed',
    value: function addViewed() {
      var _props = this.props,
          message = _props.message,
          time = _props.time,
          me = _props.me;

      if (!message.id || !time || !me.id) return false;
      if (message.read) return false;
      console.log('ADD VIEWED', message.id, time);

      if (me.id == message.item_id) {
        this.props.dispatch(_Creators2.default.updateMessagesAttempt({
          user_id: me.id,
          id: message.id,
          read: time
        }));
      }
    }
  }, {
    key: 'toggleCheckbox',
    value: function toggleCheckbox() {
      this.setState(function (_ref) {
        var isChecked = _ref.isChecked;
        return {
          isChecked: !isChecked
        };
      });
    }
  }, {
    key: 'getData',
    value: function getData(pageNumber, messageId) {
      var message = this.props.message;

      if (!message.id) return false;
      var Meta = {
        query: {
          page: pageNumber
        },
        path: "/replies/"
      };
      Meta.query.linked_id = messageId;
      Meta.query.item_type = 'reply';
      return this.props.dispatch(_Creators2.default.getMessagesAttempt(Meta));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props,
          pageNumber = _props2.pageNumber,
          message = _props2.message;

      if (!message.linked_id) return false;
      this.getData(pageNumber, message.linked_id);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      console.log('Message New Props', newProps, this.props);
      var _props3 = this.props,
          pageNumber = _props3.pageNumber,
          message = _props3.message;
      //if (newProps.pageNumber !== this.props.pageNumber) {
      //  return this.getData(newProps.pageNumber)
      //}

      if (newProps.message.linked_id !== message.linked_id) {
        return this.getData(pageNumber, newProps.message.linked_id);
      }
      this.addViewed();
    }
  }, {
    key: 'deleteConversation',
    value: function deleteConversation() {
      var _props4 = this.props,
          time = _props4.time,
          me = _props4.me,
          message = _props4.message;

      if (!me.id || !message.id) return false;

      this.props.dispatch(_Creators2.default.updateMessagesAttempt({
        user_id: me.id,
        id: message.id,
        deleted_at: time
      }));
    }
  }, {
    key: 'renderReplies',
    value: function renderReplies() {
      var replies = this.props.replies;

      console.log('RENDER REPLIES', replies);
      if (!replies.items) return false;
      return _react2.default.createElement(
        'div',
        { className: 'message-replies' },
        replies.items.map(function (message, id) {
          var from = message.user;
          if (!from) return false;
          return _react2.default.createElement(
            'div',
            { key: id, className: 'message' },
            _react2.default.createElement(
              _reactFoundation.Row,
              null,
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 1, className: 'message-user' },
                _react2.default.createElement(_booshReactUsers.User, { user: from })
              ),
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 8, className: 'message-cont' },
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: "/" + from.username + "/activity" },
                  _react2.default.createElement(
                    'div',
                    { className: 'message-username' },
                    from.username
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'message-content' },
                  _react2.default.createElement(_reactRemarkable2.default, { source: message.content })
                )
              ),
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 3, className: 'message-createdAt' },
                _react2.default.createElement(
                  'span',
                  null,
                  message.createdAt
                )
              )
            )
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props5 = this.props,
          me = _props5.me,
          message = _props5.message,
          replies = _props5.replies,
          item_type = _props5.item_type;

      if (!me.id) {
        return false;
      }

      if (!message) {
        return false;
      }

      var from = message.user;
      if (!from) {
        return false;
      }

      if (item_type == 'sent') {
        from = message.item;
      }

      var notMe = message.user.id == me.id ? message.item : message.user;

      console.log('MESSAGE', message);
      console.log('REPLIES', replies);

      if (this.props.full) {
        return _react2.default.createElement(
          'div',
          { className: 'message-full' },
          _react2.default.createElement(
            'div',
            { className: 'message' },
            _react2.default.createElement(
              _reactFoundation.Row,
              null,
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 12 },
                _react2.default.createElement(
                  'div',
                  { className: 'message-title' },
                  'Your conversation with ' + notMe.username
                )
              )
            ),
            _react2.default.createElement(
              _reactFoundation.Row,
              null,
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 1, className: 'message-user' },
                _react2.default.createElement(_booshReactUsers.User, { user: from })
              ),
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 8, className: 'message-cont' },
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: "/" + from.username + "/activity" },
                  _react2.default.createElement(
                    'div',
                    { className: 'message-username' },
                    from.username
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'message-content' },
                  _react2.default.createElement(_reactRemarkable2.default, { source: message.content })
                )
              ),
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 3, className: 'message-createdAt' },
                _react2.default.createElement(
                  'span',
                  null,
                  message.createdAt
                )
              )
            )
          ),
          this.renderReplies(),
          _react2.default.createElement(
            'div',
            { className: 'message-reply' },
            _react2.default.createElement(
              _reactFoundation.Row,
              null,
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 9 },
                _react2.default.createElement(_AddMessageForm2.default, { from_id: me.id, to_id: notMe.id })
              ),
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 3 },
                _react2.default.createElement(
                  _reactFoundation.Button,
                  { onClick: function onClick() {
                      _this2.deleteConversation();
                    } },
                  'Delete Conversation'
                )
              )
            )
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'message' },
        _react2.default.createElement(
          _reactFoundation.Row,
          null,
          _react2.default.createElement(
            _reactFoundation.Column,
            { small: 2, className: 'message-user' },
            _react2.default.createElement(_booshReactUsers.User, { user: from })
          ),
          _react2.default.createElement(
            _reactFoundation.Column,
            { small: 6, className: 'message-cont' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: "/message/" + message.linked_id },
              _react2.default.createElement(
                'div',
                { className: 'message-username' },
                from.username
              ),
              _react2.default.createElement(
                'div',
                { className: 'message-createdAt' },
                message.createdAt
              ),
              message.read ? '' : _react2.default.createElement(
                'div',
                { className: 'message-read' },
                'Unread'
              )
            )
          ),
          _react2.default.createElement(
            _reactFoundation.Column,
            { small: 3, className: 'message-showonline' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: "/upgrade" },
              'Show Online Time'
            )
          ),
          _react2.default.createElement(
            _reactFoundation.Column,
            { small: 1, className: 'message-checkbox' },
            _react2.default.createElement(_booshReactComponents.Checkbox, {
              handleCheckboxChange: this.toggleCheckbox,
              key: message.id })
          )
        )
      );
    }
  }]);
  return Message;
}(_react2.default.Component);

/* Components */


Message.propTypes = {
  message: _react2.default.PropTypes.object,
  replies: _react2.default.PropTypes.object,
  me: _react2.default.PropTypes.object,
  pageNumber: _react2.default.PropTypes.number,
  time: _react2.default.PropTypes.string
};

Message.defaultProps = {
  message: {},
  replies: {},
  me: {},
  pageNumber: 1,
  time: null
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    replies: (0, _MessagesSelector.getMessagesCollection)(state, props),
    me: (0, _booshReactAuth.getMe)(state, props),
    time: state.status.time || null
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Message);