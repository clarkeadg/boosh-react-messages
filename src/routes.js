
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Compose from './Containers/Compose'
import Inbox from './Containers/Inbox'
import Sent from './Containers/Sent'
import Message from './Containers/Message'

export default () => {
  const routes = (
    <Route path="">
      <Route path="messages/compose/:userId" component={Compose} />
      <Route path="messages/inbox" component={Inbox} />
      <Route path="messages/inbox/:pageNumber" component={Inbox} />
      <Route path="messages/sent" component={Sent} />
      <Route path="messages/sent/:pageNumber" component={Sent} />
      <Route path="message/:messageId" component={Message} />
    </Route>
  );
  return routes;
};
