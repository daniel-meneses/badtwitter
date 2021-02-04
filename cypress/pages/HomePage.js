
import UserPost from '../components/UserPost.js';
import PostForm from '../components/PostForm.js';

const HomePage = () => {

  const elements = {
    homeGuestText: () => cy.byTestId('home-guest-text'),
    userPost: () => cy.byTestId('user-post'),
  }

  function homeGuestTextIsDisplayed() {
    const { homeGuestText } = elements;
    homeGuestText().should('be.visible')
  }

  return {
    homeGuestTextIsDisplayed,
    ...UserPost(),
    ...PostForm(),
  }
}


export default HomePage;