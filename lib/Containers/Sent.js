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

var _booshReactPagination = require('boosh-react-pagination');

var _booshReactAuth = require('boosh-react-auth');

var _MessagesCollection = require('../Collections/MessagesCollection');

var _MessagesCollection2 = _interopRequireDefault(_MessagesCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* React */
var Messages = function (_React$Component) {
  (0, _inherits3.default)(Messages, _React$Component);

  function Messages() {
    (0, _classCallCheck3.default)(this, Messages);
    return (0, _possibleConstructorReturn3.default)(this, (Messages.__proto__ || (0, _getPrototypeOf2.default)(Messages)).apply(this, arguments));
  }

  (0, _createClass3.default)(Messages, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          me = _props.me,
          pageNumber = _props.pageNumber,
          count = _props.count;

      return _react2.default.createElement(_MessagesCollection2.default, { me: me, item_type: 'sent', pageNumber: pageNumber, count: count });
    }
  }]);
  return Messages;
}(_react2.default.Component);

/* Collections */


/* Selectors */


Messages.propTypes = {
  me: _react2.default.PropTypes.object,
  pageNumber: _react2.default.PropTypes.number,
  count: _react2.default.PropTypes.number
};

Messages.defaultProps = {
  me: {},
  pageNumber: 1,
  count: 0
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    me: (0, _booshReactAuth.getMe)(state, props),
    pageNumber: (0, _booshReactPagination.getPageNumber)(state, props),
    count: (0, _booshReactPagination.getPageCount)(state, props)
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Messages);