
/* React */
import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

/* Selectors */
import { getPageNumber, getPageCount } from 'boosh-react-pagination'

/* Collections */
import MessagesCollection from '../Collections/MessagesCollection'

class Messages extends React.Component {

  render() {
    let { pageNumber, count } = this.props;
    return (<MessagesCollection item_type={'inbox'} pageNumber={pageNumber} count={count}/>)
  }

}

Messages.propTypes = {
  pageNumber: React.PropTypes.number,
  count: React.PropTypes.number
}

Messages.defaultProps = {
  pageNumber: 1,
  count: 0
}

const mapStateToProps = (state, props) => {
  return {
    pageNumber: getPageNumber(state, props),
    count: getPageCount(state, props)
  }
}

export default connect(mapStateToProps)(Messages)

