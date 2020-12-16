import elements from '../constants/elements';

const stubAll = () => {
  cy.stubFetchHomeFeed()
  cy.stubFetchLikes()
  cy.stubFetchTrendingTags()
  cy.stubFetchGlobalFeed()
  cy.stubFetchNewsFeed()
  cy.stubFetchFollowers()
  cy.stubFetchSubscriptions()
  cy.stubFetchSelfProfile()
  cy.stubFetchUserProfileFeed()
  cy.stubLogin()
  cy.stubPostFormRequest()
  cy.stubLinkPreviewAPI()
  cy.stubDeleteSubscription()
}

describe('Subscribe button tests', () => {

  beforeEach(() => {
    cy.clearCookies()
    stubAll()
  });

  it('Subscribe button displays edit profile for own user profile', () => {
    cy.launchAndLogIn();
    cy.selectNavAtPosition(4)
    cy.getButtonWithtext('Edit Profile').click()
    cy.getHeaderWithText('Account').should('be.visible')
  })

  it('Unsubscribe from user profile page', () => {
    cy.launchAndLogIn();
    cy.selectNavAtPosition(3)
    cy.selectTabAtPosition(1)
    cy.get(elements.userPreview).click()
    cy.getButtonWithtext('Following').trigger('mouseover')
    cy.getButtonWithtext('Unfollow').click();
    cy.getButtonWithtext('Follow').should('be.visible')
  })

  it('Unsubscribe from subcribers list user preview', () => {
    cy.launchAndLogIn();
    cy.selectNavAtPosition(3)
    cy.selectTabAtPosition(2)
    cy.get(elements.userPreview).should('have.length', 2)
    cy.getButtonWithtext('Following').eq(0).trigger('mouseover')
    cy.getButtonWithtext('Unfollow').click();
    cy.get(elements.userPreview).should('have.length', 1)
  })


})

