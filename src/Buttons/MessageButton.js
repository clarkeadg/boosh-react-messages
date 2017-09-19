
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getUserById } from 'boosh-react-users'

/* Components */
import { Button, Icon } from 'react-foundation';
import { Link } from 'react-router'

class MessageButton extends React.Component {

  render() {

    let { user } = this.props
    if (!user) return false

    return (
      <Link className="btn-message" to={"/messages/compose/"+user.id}><Button><Icon name="fi-mail"/>Send {user.username} a Message</Button></Link>
    )
  }

}

const mapStateToProps = (state, props) => {
  return {
    user: getUserById(state, props)
  }
}

export default connect(mapStateToProps)(MessageButton)

