'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require('normalizr');

var MessageSchema = new _normalizr.Schema('messages', { idAttribute: 'id' });

var FromSchema = new _normalizr.Schema('user', { idAttribute: 'id' });
var ToSchema = new _normalizr.Schema('item', { idAttribute: 'id' });

MessageSchema.define({
  from: FromSchema,
  to: ToSchema
});

exports.default = MessageSchema;