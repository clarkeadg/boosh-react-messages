import { createSelector } from 'reselect'

/* Private */

const allMessages = (state, props) => state.messages

const path = (state, props) => props.path ? props.path.replace(/\//g,'') : 'messages'

const messageId = (state, props) => props.params.messageId

/* Export */

export const getMessagesCollection = createSelector(
  [ allMessages, path ],
  ( messages, key ) => {
    let collection = {
      items: [],
      count: 0
    }
    if (!messages.collections[key]) return collection;
    collection.count = messages.collections[key].count;
    collection.items = messages.collections[key].result.map((id) => {
      return messages.entities[id]
    })
    return collection;
  }
)

export const getVisibleMessages = createSelector(
  [ allMessages ],
  ( messages ) => {
    return messages.result.map((id) => {
      return messages.entities[id]
    })
  }
)

export const getMessageById = createSelector(
  [ allMessages, messageId ],
  ( messages, id ) => {
    return messages.entities[id]
  }
)
