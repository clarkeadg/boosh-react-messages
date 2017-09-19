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

var _Message = require('../Components/Message/Message');

var _Message2 = _interopRequireDefault(_Message);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Selectors */

/* React */
var MessagesCollection = function (_React$Component) {
  (0, _inherits3.default)(MessagesCollection, _React$Component);

  function MessagesCollection(props) {
    (0, _classCallCheck3.default)(this, MessagesCollection);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MessagesCollection.__proto__ || (0, _getPrototypeOf2.default)(MessagesCollection)).call(this, props));

    _this.selectAll = function () {
      var messages = _this.props.messages;

      if (!messages) return false;
      var items = messages.items || [];

      var checked = !_this.state.allSelected;

      var checkedIds = {};
      if (checked) {
        items.map(function (item) {
          checkedIds[item.id] = true;
        });
      }

      _this.setState({
        allSelected: checked,
        checkedIds: checkedIds
      });
    };

    _this.state = {
      checkedIds: {},
      allSelected: false
    };

    _this.toggleCheckbox = _this.toggleCheckbox.bind(_this);
    _this.selectAll = _this.selectAll.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MessagesCollection, [{
    key: 'toggleCheckbox',
    value: function toggleCheckbox(id) {

      if (!this.state.checkedIds[id]) {
        this.state.checkedIds[id] = true;
        return;
      }
      this.state.checkedIds[id] = !this.state.checkedIds[id];
    }
  }, {
    key: 'getData',
    value: function getData(pageNumber, me) {
      var item_type = this.props.item_type;

      if (!me.id) return false;
      var Meta = {
        query: {
          page: pageNumber
        },
        path: this.props.path || "/messages/"
      };
      if (item_type == 'inbox') {
        //Meta.query.item_id = me.id;
        Meta.query.item_id = me.id;
        Meta.query.item_type = 'conversation';
        return this.props.dispatch(_Creators2.default.getMessagesAttempt(Meta));
      }
      if (item_type == 'sent') {
        Meta.query.sent_id = me.id;
        return this.props.dispatch(_Creators2.default.getMessagesAttempt(Meta));
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          me = _props.me,
          pageNumber = _props.pageNumber;

      if (!me.id) return false;
      this.getData(pageNumber, me);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var pageNumber = this.props.pageNumber;

      if (!newProps.me.id) return false;
      if (newProps.me.id && newProps.me.id !== this.props.me.id) {
        return this.getData(1, newProps.me);
      }
      if (!this.props.me) return false;
      if (newProps.item_type !== this.props.item_type) {
        return this.getData(1, this.props.me);
      }
      if (newProps.pageNumber !== this.props.pageNumber) {
        return this.getData(newProps.pageNumber, this.props.me);
      }
    }
  }, {
    key: 'deleteItems',
    value: function deleteItems() {
      var _props2 = this.props,
          me = _props2.me,
          time = _props2.time;

      if (!me.id) return false;

      var items = [];
      for (var id in this.state.checkedIds) {
        if (this.state.checkedIds[id]) {
          this.props.dispatch(_Creators2.default.updateMessagesAttempt({
            user_id: me.id,
            id: id,
            deleted_at: time
          }));
        }
      }
      console.log('DELETE ITEMS', items);

      //this.props.dispatch(Actions.updateMessagesAttempt(items));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          messages = _props3.messages,
          pageNumber = _props3.pageNumber,
          loading = _props3.loading,
          item_type = _props3.item_type;


      var z = this;

      if (loading) {
        return _react2.default.createElement(_booshReactComponents.Loading, null);
      }

      var path = this.props.path || "/messages/";
      var per_page = this.props.per_page || 10;
      var pager = this.props.pager || "numbers";

      return _react2.default.createElement(
        'div',
        { className: 'messages' },
        _react2.default.createElement(
          'div',
          { className: 'messages-top' },
          _react2.default.createElement(
            'div',
            { className: 'select-all' },
            _react2.default.createElement(
              'span',
              null,
              'Select All'
            ),
            _react2.default.createElement('input', {
              type: 'checkbox',
              checked: this.state.allSelected,
              onChange: this.selectAll })
          )
        ),
        messages.items.map(function (message, id) {

          var from = message.user;
          if (!from) {
            return false;
          }

          if (item_type == 'sent') {
            from = message.item;
          }

          return _react2.default.createElement(
            'div',
            { className: 'message', key: id },
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
                _react2.default.createElement('input', {
                  type: 'checkbox',
                  checked: z.state.checkedIds[message.id],
                  onChange: function onChange() {
                    z.toggleCheckbox(message.id);
                  } })
              )
            )
          );
        }),
        _react2.default.createElement(
          'div',
          { className: 'messages-buttons right' },
          _react2.default.createElement(
            _reactFoundation.Button,
            { onClick: function onClick() {
                _this2.deleteItems();
              } },
            'Delete'
          )
        ),
        _react2.default.createElement(_booshReactComponents.Pagination, { path: path, pager: pager, per_page: per_page, pageNumber: pageNumber, count: messages.count })
      );
    }
  }]);
  return MessagesCollection;
}(_react2.default.Component);

/* Components */


/* Actions */


MessagesCollection.propTypes = {
  loading: _react2.default.PropTypes.bool,
  messages: _react2.default.PropTypes.object,
  me: _react2.default.PropTypes.object,
  pageNumber: _react2.default.PropTypes.number
};

MessagesCollection.defaultProps = {
  loading: false,
  messages: {},
  me: {},
  pageNumber: 1
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    //loading: state.messages.attempting,
    time: state.status.time,
    messages: (0, _MessagesSelector.getMessagesCollection)(state, props)
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MessagesCollection);