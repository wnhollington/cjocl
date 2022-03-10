import addToMailchimp from "gatsby-plugin-mailchimp"
import React from "react"

export default class MailChimpForm extends React.Component {
  constructor() {
    super()
    this.state = { email: "", result: null }
  }
  _handleSubmit = async e => {
    e.preventDefault()
    const result = await addToMailchimp(this.state.email)
    this.setState({result: result})
    document.getElementById('submit-message').innerHTML = result.msg
    document.getElementById('form').reset()
  }
  handleChange = event => {
      this.setState({ email: event.target.value })
    }
  render() {

    return (
      <>
        <div id="submit-message" class="m-1 pb-3"></div>
        <form onSubmit={this._handleSubmit} id="form">
          <div class="form-group mb-4">
            <input type="email" label="email" name="email" id="email" class="form-control input-sm" placeholder="Email Address" onChange={this.handleChange} />
          </div>

          <input type="submit" label="submit" id="submit" value="Signup" class="btn btn-primary btn-block" />
        </form>
      </>
    )
  }
}