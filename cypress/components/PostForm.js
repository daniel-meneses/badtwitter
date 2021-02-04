
import UserPreview from './UserPreview.js';

const PostForm = () => {

  const elements = {
    postForm: () => cy.dataTestId('post-form'),
    submit: () => cy.closestDataTestId('post-form', 'button'),
  }

  function postIsNullState() {
    const { postForm, submit } = elements;
    submit().should('have.css', 'opacity', '0.5')
    postForm().invoke('attr', 'data-text').should('contain', `What's happenning?`);
  }

  function enterNewPost(message) {
    const { postForm, submit } = elements;
    postForm().type(message).should('have.text', message);
    submit().not('have.css', 'opacity', '0.5');
    submit().click();
  }

  return {
    postIsNullState,
    enterNewPost,
    ...UserPreview()
  }
}


export default PostForm;