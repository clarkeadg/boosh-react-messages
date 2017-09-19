import { Schema, valuesOf, arrayOf } from 'normalizr'

const MessageSchema = new Schema('messages', { idAttribute: 'id' });

const FromSchema = new Schema('user', { idAttribute: 'id' });
const ToSchema = new Schema('item', { idAttribute: 'id' });

MessageSchema.define({
  from: FromSchema,
  to: ToSchema
});

export default MessageSchema;
