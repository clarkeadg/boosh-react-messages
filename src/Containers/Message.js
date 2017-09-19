
/* React */
import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getMessageById } from '../Selectors/MessagesSelector'

/* Components */
import { Row, Column, Button } from 'react-foundation'
import { Portlet, Nav, Loading } from 'boosh-react-components'
import { User, getUserById } from 'boosh-react-users'
import { Link } from 'react-router'
import Message from '../Components/Message/Message'

/* Collections */
//import MessagesCollection from '../Collections/MessagesCollection'

/*
<div className="message">
  <User user={from}/>
  <div className="title">{ message.title}</div>
  <div className="content">{ message.content}</div>
</div>
*/

class MessageContainer extends React.Component {

  componentDidMount() {
    this.getData()
  }

  getData() {
    let Meta = {
      id: this.props.params.messageId
    }
    this.props.dispatch(Actions.getMessagesAttempt(Meta));
  }

  renderMessage(loading, message) {
    if (loading) {
      return (
        <Loading/>
      )
    }
    return (
      <Message full={true} message={message} user_id={message.from_id}/>
    )
  }

  render() {

    let { message, loading } = this.props;

    console.log('MESSAGE', message)

    return (
      <div className="messages">
        <Row className="display">
          <Column small={12} medium={3}>
            <Portlet title={''} items={
              <div>
                <Nav isVertical={true} items={[
                  {"title":"Inbox","url":"/messages/inbox"},
                  {"title":"Sent","url":"/messages/sent"}
                ]}/>
              </div>
            }/>
          </Column>
          <Column small={12} medium={9}>
            <Portlet title={'Messages'} items={
              <div className="messages">
                { this.renderMessage(loading, message) }
              </div>
            } />
          </Column>
        </Row>
      </div>
    )
  }

}

MessageContainer.propTypes = {
  loading: React.PropTypes.bool,
  message: React.PropTypes.object
}

MessageContainer.defaultProps = {
  loading: true,
  message: {}
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.messages.attempting,
    message: getMessageById(state, props)
  }
}

export default connect(mapStateToProps)(MessageContainer)

