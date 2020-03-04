import React from 'react'
import ContentEditable from 'react-contenteditable'
import { connect } from 'react-redux'
import { postMessage } from '../../actions/post.js'

function mapStateToProps(state) {
  return {
    user: state.session.currentUser
  }
}

class PostEditable extends React.Component {
  constructor() {
    super()
    this.contentEditable = React.createRef();
  //  this.state = {html: "<b></b>"};
    this.state = {
      isFocused: false,
      html: "<b>What's <i>happening?</i></b>",
      postText: ""
    };
  };

  handleChange = evt => {
    this.setState({html: evt.target.value});
  };

  onFocus = () => {
    this.setState({isFocused: true})
  }

  render = () => {
    let {user, postText="", handleSubmit} = this.props;
    return (
      <div className="p-form">
        <div className="post_form_main">
          <img src={user.avatar}/>
          <ContentEditable
                    id={'input'}
                    className={''}
                    innerRef={this.contentEditable}
                    html={this.state.html} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleChange} // handle innerHTML change
                    onFocus={this.clearState}
                    tagName='article' // Use a custom HTML tag (uses a div by default)
                  />
          <div className="post_form_footer">
            <input type="submit"
                   className={postText.length > 0 ? 'submit_post highlighted' : 'submit_post'}
                   onClick={handleSubmit}
                   value="Submit" />
                   </div>
              </div>
      </div>
      )};
};

export default connect(mapStateToProps, {})(PostEditable)
