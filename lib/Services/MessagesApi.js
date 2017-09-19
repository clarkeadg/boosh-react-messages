'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apisauce = require('apisauce');

var _apisauce2 = _interopRequireDefault(_apisauce);

var _booshReactAuth = require('boosh-react-auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const apiURL = 'http://ec2-54-69-109-0.us-west-2.compute.amazonaws.com/api/v1/'
// a library to wrap and simplify api calls
var apiURL = 'http://local.api.boosh.io/';

// our "constructor"
var create = function create() {
  var baseURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : apiURL;

  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  var api = _apisauce2.default.create({
    // base URL is read from the "constructor"
    baseURL: baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  });

  // Force OpenWeather API Key on all requests
  /*api.addRequestTransform(request => {
    request.params['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
  })*/

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  //if (__DEV__ && console.tron) {
  //  console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
  //  iTunesApi.addMonitor(console.tron.apisauce)
  //}

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  /* MESSAGES */

  var getMessages = function getMessages(q) {
    var accessToken = (0, _booshReactAuth.getAccessToken)();
    if (accessToken) api.setHeader('Authorization', 'Bearer ' + accessToken);
    return api.get('messages', q);
  };

  var updateMessages = function updateMessages(id, q) {
    var accessToken = (0, _booshReactAuth.getAccessToken)();
    if (accessToken) api.setHeader('Authorization', 'Bearer ' + accessToken);
    return api.put('messages/' + id, q);
  };

  var addMessage = function addMessage(q) {
    var accessToken = (0, _booshReactAuth.getAccessToken)();
    if (accessToken) api.setHeader('Authorization', 'Bearer ' + accessToken);
    return api.post('messages', q);
  };

  var deleteMessage = function deleteMessage(id) {
    var accessToken = (0, _booshReactAuth.getAccessToken)();
    if (accessToken) api.setHeader('Authorization', 'Bearer ' + accessToken);
    return api.delete('message/' + id);
  };

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2

    getMessages: getMessages,
    updateMessages: updateMessages,
    addMessage: addMessage,
    deleteMessage: deleteMessage

  };
};

// let's return back our create method as the default.
exports.default = {
  create: create
};