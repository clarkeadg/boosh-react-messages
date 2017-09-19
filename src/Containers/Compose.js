
/* React */
import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getMe } from 'boosh-react-auth'

/* Components */
import { Row, Column, Button } from 'react-foundation'
import { Portlet, Nav, Loading } from 'boosh-react-components'
import { User, getUserById } from 'boosh-react-users'
import { Link } from 'react-router'
import AddMessageForm from '../Forms/AddMessageForm'

class ComposeContainer extends React.Component {

  componentDidMount() {
    this.getData()
  }

  getData() {
    let Meta = {
      id: this.props.params.messageId
    }
    this.props.dispatch(Actions.getMessagesAttempt(Meta));
  }

  renderMessageForm(loading, from_id, to_id) {
    if (loading) {
      return (
        <Loading/>
      )
    }
    return (
      <AddMessageForm from_id={from_id} to_id={to_id}/>
    )
  }

  render() {

    let { me, to_id, loading } = this.props;

    console.log('NEW MESSAGE', me.id, to_id)

    return (
      <div className="messages">
        <Row className="display">
          <Column small={12} >
            <Portlet title={'New Message'} items={
              <div className="new-message">
                { this.renderMessageForm(loading, me.id, to_id) }
              </div>
            } />
          </Column>
        </Row>
      </div>
    )
  }

}

ComposeContainer.propTypes = {
  me: React.PropTypes.object,
  loading: React.PropTypes.bool
}

ComposeContainer.defaultProps = {
  me: {},
  loading: true
}

const mapStateToProps = (state, props) => {
  return {
    me: getMe(state, props),
    to_id: props.params.userId,
    loading: state.messages.attempting
  }
}

export default connect(mapStateToProps)(ComposeContainer)

