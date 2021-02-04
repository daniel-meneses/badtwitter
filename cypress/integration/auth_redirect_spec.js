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

describe('Login redirect tests', () => {
/*
  beforeEach(() => {
    cy.clearCookies()
    stubAll()
  });

  it('Login from home guest text redirects to home', () => {
    cy.visit('http://localhost:3000/home')
    cy.get(elements.homeGuestText).should('be.visible')
    cy.contains('log in').click()
    cy.logIn()
    cy.get(elements.userPost).should('be.visible')
    cy.get(elements.headerText).should('have.text', 'Home')
  })

  it('Login from header guest text redirects to last viewed page', () => {
    cy.visit('http://localhost:3000/home')
    cy.get(elements.homeGuestText).should('be.visible')
    cy.contains('Login/Register').click()
    cy.contains('Sign In').click()
    cy.logIn()
    cy.get(elements.userPost).should('be.visible')
    cy.get(elements.headerText).should('have.text', 'Home')
  })

  it('Login from like button guest prompt redirects to last viewed page', () => {
    cy.visit('http://localhost:3000/home')
    cy.get(elements.homeGuestText).should('be.visible')
    cy.selectNavAtPosition(2)
    cy.get(elements.likeBtn).first().click()
    cy.get(elements.guestToast).children('button').eq(1).click()
    cy.logIn()
    cy.get(elements.userPost).should('be.visible')
    cy.get(elements.headerText).should('have.text', 'Explore')
  })

  it('Login from trending tab redirects to explore with trending selected', () => {
    cy.visit('http://localhost:3000/home')
    cy.get(elements.homeGuestText).should('be.visible')
    cy.selectNavAtPosition(2)
    cy.selectTabAtPosition(1)
    cy.contains('Login/Register').click()
    cy.contains('Sign In').click()
    cy.logIn()
    cy.get(elements.headerText).should('have.text', 'Explore')
    cy.get(elements.topTab).eq(1).should('have.css', 'background-color', 'rgb(240, 245, 245)')
  })
  */
/*
  it('Login from share article guest prompt redirects to article page', () => {
    cy.visit('http://localhost:3000/home')
    cy.get(elements.homeGuestText).should('be.visible')
    cy.selectNavAtPosition(2)
    cy.selectTabAtPosition(2)
    cy.get(elements.newsHeader).click()
    cy.get(elements.newsButtonContainer).children('div').click()
    cy.get(elements.guestToast).children('button').eq(1).click()
    cy.logIn()
    cy.get(elements.headerText).should('have.text', 'Explore')
    cy.get(elements.newsFullStory).should('be.visible')
  })
*/
})

