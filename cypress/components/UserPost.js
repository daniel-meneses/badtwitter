
import UserPreview from './UserPreview.js';

const UserPost = () => {

  const elements = {
    userPost: () => cy.byTestId('user-post'),
    postMessage: () => cy.byTestId('user-post-message'),
    likeBtn: () => cy.byTestId('like-selectable'),
  }

  function getPostMessage() {
    const { postMessage } = elements;
    postMessage();
  }
  
  return {
    getPostMessage,
    ...UserPreview()
  }
}


export default UserPost;