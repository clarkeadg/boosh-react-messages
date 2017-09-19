
/* React */
import React from 'react'
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Components */
import Form from 'react-jsonschema-form'
import { Button } from 'react-foundation'

class AddMessageForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: {
        schema: {
          xtitle: "Login",
          type: "object",
          required: ["addMessage"],
          properties: {
            addMessage: {title: "Add Message", type: "string" }
          }
        },
        uiSchema: {
          addMessage: {
            "ui:widget": "textarea",
            "ui:options": {
              rows: 5
            }
          }
        },
        formData: {
        },
        buttons: [
          { "type": "Submit", "title": "Send Message" }
        ]
      }
    }
  }

  onSubmit = ({formData}) => {
    this.props.dispatch(Actions.addMessageAttempt({
      user_id: this.props.from_id,
      item_id: this.props.to_id,
      content: formData.addMessage
    }))
    formData.addMessage = "";
  }

  onChange = ({formData}) => {

  }

  onError = ({formData}) => {

  }

  render() {

    let z = this;

    return (
      <Form
        schema={z.state.form.schema}
        uiSchema={z.state.form.uiSchema}
        formData={z.state.form.formData}
        onChange={z.onChange}
        onSubmit={z.onSubmit}
        onError={z.onError} >
        <div>{z.state.form.buttons.map((item,id) => {
          return (<Button key={id} type={item.type}>{ item.title }</Button>)
        })}</div>
      </Form>
    );
  }

}

const mapStateToProps = (state, props) => {
  return {
  }
}

export default connect(mapStateToProps)(AddMessageForm)



