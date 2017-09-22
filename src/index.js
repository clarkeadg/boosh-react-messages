
const AddMessageForm    = require('./Forms/AddMessageForm');
const Message           = require('./Components/Message/Message');
const MessagesSelector  = require('./Selectors/MessagesSelector');
const MessageButton     = require('./Buttons/MessageButton');
const MessagesCollection = require('./Collections/MessagesCollection');
const MessagesActions   = require('./Actions/Creators');
const MessagesSaga      = require('./Sagas/MessagesSaga');
const MessagesApi       = require('./Services/MessagesApi');
const MessagesReducer   = require('./Reducers/MessagesReducer');
const MessagesRoutes    = require('./routes');

module.exports = {
  AddMessageForm:       AddMessageForm.default,
  Message:              Message.default,
  getVisibleMessages:   MessagesSelector.getVisibleMessages,
  getMessageById:       MessagesSelector.getMessageById,
  getMessagesCollection:MessagesSelector.getMessagesCollection,
  MessageButton:        MessageButton.default,
  MessagesCollection:   MessagesCollection.default,
  MessagesActions:      MessagesActions.default,
  MessagesSaga:         MessagesSaga.default,
  MessagesApi:          MessagesApi.default,
  MessagesReducer:      MessagesReducer.default,
  MessagesRoutes:       MessagesRoutes.default
}
