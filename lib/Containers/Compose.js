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

var _booshReactAuth = require('boosh-react-auth');

var _reactFoundation = require('react-foundation');

var _booshReactComponents = require('boosh-react-components');

var _booshReactUsers = require('boosh-react-users');

var _reactRouter = require('react-router');

var _AddMessageForm = require('../Forms/AddMessageForm');

var _AddMessageForm2 = _interopRequireDefault(_AddMessageForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Selectors */

/* React */
var ComposeContainer = function (_React$Component) {
  (0, _inherits3.default)(ComposeContainer, _React$Component);

  function ComposeContainer() {
    (0, _classCallCheck3.default)(this, ComposeContainer);
    return (0, _possibleConstructorReturn3.default)(this, (ComposeContainer.__proto__ || (0, _getPrototypeOf2.default)(ComposeContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(ComposeContainer, [{
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
    key: 'renderMessageForm',
    value: function renderMessageForm(loading, from_id, to_id) {
      if (loading) {
        return _react2.default.createElement(_booshReactComponents.Loading, null);
      }
      return _react2.default.createElement(_AddMessageForm2.default, { from_id: from_id, to_id: to_id });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          me = _props.me,
          to_id = _props.to_id,
          loading = _props.loading;


      console.log('NEW MESSAGE', me.id, to_id);

      return _react2.default.createElement(
        'div',
        { className: 'messages' },
        _react2.default.createElement(
          _reactFoundation.Row,
          { className: 'display' },
          _react2.default.createElement(
            _reactFoundation.Column,
            { small: 12 },
            _react2.default.createElement(_booshReactComponents.Portlet, { title: 'New Message', items: _react2.default.createElement(
                'div',
                { className: 'new-message' },
                this.renderMessageForm(loading, me.id, to_id)
              ) })
          )
        )
      );
    }
  }]);
  return ComposeContainer;
}(_react2.default.Component);

/* Components */


/* Actions */


ComposeContainer.propTypes = {
  me: _react2.default.PropTypes.object,
  loading: _react2.default.PropTypes.bool
};

ComposeContainer.defaultProps = {
  me: {},
  loading: true
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    me: (0, _booshReactAuth.getMe)(state, props),
    to_id: props.params.userId,
    loading: state.messages.attempting
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ComposeContainer);