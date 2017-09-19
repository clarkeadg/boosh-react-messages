
/* React */
import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

/* Selectors */
import { getPageNumber, getPageCount } from 'boosh-react-pagination'
import { getMe } from 'boosh-react-auth'

/* Collections */
import MessagesCollection from '../Collections/MessagesCollection'

class Messages extends React.Component {

  render() {
    let { me, pageNumber, count } = this.props;
    return (<MessagesCollection me={me} item_type={'sent'} pageNumber={pageNumber} count={count}/>)
  }

}

Messages.propTypes = {
  me: React.PropTypes.object,
  pageNumber: React.PropTypes.number,
  count: React.PropTypes.number
}

Messages.defaultProps = {
  me: {},
  pageNumber: 1,
  count: 0
}

const mapStateToProps = (state, props) => {
  return {
    me: getMe(state, props),
    pageNumber: getPageNumber(state, props),
    count: getPageCount(state, props)
  }
}

export default connect(mapStateToProps)(Messages)

