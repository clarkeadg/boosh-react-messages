
/* React */
import React from 'react';
import { connect } from 'react-redux'

import Actions from '../../Actions/Creators'

/* Components */
import { Row, Column, Button } from 'react-foundation'
import { Checkbox } from 'boosh-react-components'
import { getMe } from 'boosh-react-auth'
import { User, getUserById } from 'boosh-react-users'
import { Link } from 'react-router'
import Markdown from 'react-remarkable'
import { getMessagesCollection } from '../../Selectors/MessagesSelector'
import AddMessageForm from './../../Forms/AddMessageForm'
import MessagesActions from '../../Actions/Creators'

class Message extends React.Component {

  addViewed() {
    let { message, time, me } = this.props;
    if (!message.id || !time || !me.id) return false;
    if (message.read) return false;
    console.log('ADD VIEWED', message.id, time)

    if (me.id == message.item_id) {
      this.props.dispatch(MessagesActions.updateMessagesAttempt({
        user_id: me.id,
        id: message.id,
        read: time
      }))
    }
  }

  toggleCheckbox() {
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
  }

  getData(pageNumber, messageId) {
    let { message } = this.props;
    if (!message.id) return false;
    let Meta = {
      query: {
        page: pageNumber
      },
      path: "/replies/"
    }
    Meta.query.linked_id = messageId;
    Meta.query.item_type = 'reply';
    return this.props.dispatch(Actions.getMessagesAttempt(Meta));
  }

  componentDidMount() {
    let { pageNumber, message } = this.props
    if (!message.linked_id) return false;
    this.getData(pageNumber, message.linked_id)
  }

  componentWillReceiveProps (newProps) {
    console.log('Message New Props', newProps, this.props)
    let { pageNumber, message } = this.props
    //if (newProps.pageNumber !== this.props.pageNumber) {
    //  return this.getData(newProps.pageNumber)
    //}
    if (newProps.message.linked_id !== message.linked_id) {
      return this.getData(pageNumber, newProps.message.linked_id)
    }
    this.addViewed();
  }

  deleteConversation() {
    let { time, me, message } = this.props;
    if (!me.id || !message.id) return false;

    this.props.dispatch(Actions.updateMessagesAttempt({
      user_id: me.id,
      id: message.id,
      deleted_at: time
    }));
  }

  renderReplies() {
    let { replies } = this.props;
    console.log('RENDER REPLIES', replies)
    if (!replies.items) return false;
    return (
      <div className={'message-replies'} >
        {replies.items.map((message, id) => {
          let from = message.user;
          if (!from) return false;
          return (
            <div key={id} className={'message'}>
              <Row>
                <Column small={1} className="message-user">
                  <User user={from}/>
                </Column>
                <Column small={8} className="message-cont">
                  <Link to={"/"+from.username+"/activity"}>
                    <div className="message-username">{ from.username }</div>
                  </Link>
                  <div className="message-content"><Markdown source={ message.content }/></div>            
                </Column>
                <Column small={3} className="message-createdAt">
                  <span>{ message.createdAt }</span>
                </Column>
              </Row>
            </div>
          )
        })}
      </div>
    )
  }

  render() {

    let { me, message, replies, item_type } = this.props;
    if (!me.id) {
      return false;
    }

    if (!message) {
      return false;
    }

    let from = message.user;
    if (!from) {
      return false;
    }

    if ( item_type == 'sent') {
      from = message.item;
    }

    let notMe = (message.user.id == me.id) ? message.item : message.user;

    console.log('MESSAGE', message)
    console.log('REPLIES', replies)

    if (this.props.full) {
      return (
        <div className={'message-full'} >        
          <div className={'message'}>
            <Row>
              <Column small={12}>
                <div className={'message-title'}>
                  {'Your conversation with '+notMe.username}
                </div>
              </Column>
            </Row>
            <Row>
              <Column small={1} className="message-user">
                <User user={from}/>
              </Column>
              <Column small={8} className="message-cont">
                <Link to={"/"+from.username+"/activity"}>
                  <div className="message-username">{ from.username }</div>
                </Link>
                <div className="message-content"><Markdown source={ message.content }/></div>            
              </Column>
              <Column small={3} className="message-createdAt">
                <span>{ message.createdAt }</span>
              </Column>
            </Row>            
          </div>
          { this.renderReplies() }
          <div className={'message-reply'}>
            <Row>
              <Column small={9}>
                <AddMessageForm from_id={me.id} to_id={notMe.id}/>
              </Column>
              <Column small={3}>
                <Button onClick={()=>{this.deleteConversation()}}>Delete Conversation</Button>
              </Column>
            </Row>
          </div>
        </div>
      );
    }

    return (
      <div className={'message'} >
        <Row>
          <Column small={2} className="message-user">
            <User user={from}/>
          </Column>
          <Column small={6} className="message-cont">
            <Link to={"/message/"+message.linked_id}>
              <div className="message-username">{ from.username }</div>
              <div className="message-createdAt">{ message.createdAt }</div>
              { message.read ? '' : <div className="message-read">Unread</div> }
            </Link>
          </Column>
          <Column small={3} className="message-showonline">
            <Link to={"/upgrade"}>Show Online Time</Link>
          </Column>
          <Column small={1} className="message-checkbox">
            <Checkbox
              handleCheckboxChange={this.toggleCheckbox} 
              key={message.id} />
          </Column>
        </Row>
      </div>
    );
  }

}

Message.propTypes = {
  message: React.PropTypes.object,
  replies: React.PropTypes.object,
  me: React.PropTypes.object,
  pageNumber: React.PropTypes.number,
  time: React.PropTypes.string
}

Message.defaultProps = {
  message: {},
  replies: {},
  me: {},
  pageNumber: 1,
  time: null
}

const mapStateToProps = (state, props) => {
  return {
    replies: getMessagesCollection(state, props),
    me: getMe(state, props),
    time: state.status.time || null
  }
}

export default connect(mapStateToProps)(Message)
