
/* React */
import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getMessagesCollection } from '../Selectors/MessagesSelector'

/* Components */
import { Row, Column, Button } from 'react-foundation'
import { Pagination, Portlet, Nav, Loading } from 'boosh-react-components'
import { User } from 'boosh-react-users'
import Message from '../Components/Message/Message'
import { Link } from 'react-router'

class MessagesCollection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checkedIds: {},
      allSelected: false
    }

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.selectAll = this.selectAll.bind(this);
  }

  toggleCheckbox(id) {
   
    if (!this.state.checkedIds[id]) {
      this.state.checkedIds[id] = true;
      return;
    }
    this.state.checkedIds[id] = !this.state.checkedIds[id];    
  }

  getData(pageNumber, me) {
    let { item_type } = this.props;
    if (!me.id) return false;
    let Meta = {
      query: {
        page: pageNumber
      },
      path: this.props.path || "/messages/"
    }
    if (item_type == 'inbox') {
      //Meta.query.item_id = me.id;
      Meta.query.item_id = me.id;
      Meta.query.item_type = 'conversation';
      return this.props.dispatch(Actions.getMessagesAttempt(Meta));
    }
    if (item_type == 'sent') {
      Meta.query.sent_id = me.id;
      return this.props.dispatch(Actions.getMessagesAttempt(Meta));
    }
  }

  componentDidMount() {
    let { me, pageNumber } = this.props
    if (!me.id) return false;
    this.getData(pageNumber, me)
  }

  componentWillReceiveProps (newProps) {
    let { pageNumber } = this.props
    if (!newProps.me.id) return false;
    if (newProps.me.id && newProps.me.id !== this.props.me.id) {
      return this.getData(1, newProps.me)
    }
    if (!this.props.me) return false;
    if (newProps.item_type !== this.props.item_type) {
      return this.getData(1, this.props.me)
    }
    if (newProps.pageNumber !== this.props.pageNumber) {
      return this.getData(newProps.pageNumber, this.props.me)
    }
  }

  selectAll = () => {
    let { messages } = this.props;
    if (!messages) return false;
    let items = messages.items || [];

    let checked = !this.state.allSelected;
    
    let checkedIds = {};
    if (checked) {
      items.map((item)=>{
        checkedIds[item.id] = true;
      })
    }

    this.setState({
      allSelected: checked,
      checkedIds: checkedIds
    });
  }

  deleteItems() {
    let { me, time } = this.props;
    if (!me.id) return false;

    let items = [];
    for(let id in this.state.checkedIds) {
      if (this.state.checkedIds[id]) {
        this.props.dispatch(Actions.updateMessagesAttempt({
          user_id: me.id,
          id: id,
          deleted_at: time
        }));
      }
    }
    console.log('DELETE ITEMS', items)

    //this.props.dispatch(Actions.updateMessagesAttempt(items));
  }

  render() {

    let { messages, pageNumber, loading, item_type } = this.props;

    let z = this;

    if (loading) {
      return (
        <Loading/>
      )
    }

    let path = this.props.path || "/messages/";
    let per_page = this.props.per_page || 10;
    let pager = this.props.pager || "numbers";

    return (
      <div className="messages">
        <div className="messages-top">
          <div className="select-all">
            <span>Select All</span>
            <input
              type="checkbox"
              checked={this.state.allSelected}
              onChange={this.selectAll} />
          </div>
        </div>
        {messages.items.map((message, id) => {

          let from = message.user;
          if (!from) {
            return false;
          }

          if ( item_type == 'sent') {
            from = message.item;
          }

          return (<div className={'message'} key={id} >
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
                <input
                  type="checkbox"
                  checked={z.state.checkedIds[message.id]}
                  onChange={()=>{z.toggleCheckbox(message.id)}} />
              </Column>
            </Row>
          </div>)
        })}        
        <div className="messages-buttons right">
          <Button onClick={()=>{this.deleteItems()}}>Delete</Button>
        </div>
        <Pagination path={path} pager={pager} per_page={per_page} pageNumber={pageNumber} count={messages.count}/>
      </div>
    )
  }

}

MessagesCollection.propTypes = {
  loading: React.PropTypes.bool,
  messages: React.PropTypes.object,
  me: React.PropTypes.object,
  pageNumber: React.PropTypes.number
}

MessagesCollection.defaultProps = {
  loading: false,
  messages: {},
  me: {},
  pageNumber: 1
}

const mapStateToProps = (state, props) => {
  return {
    //loading: state.messages.attempting,
    time: state.status.time,
    messages: getMessagesCollection(state, props)
  }
}

export default connect(mapStateToProps)(MessagesCollection)
