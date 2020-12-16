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
}

const elements = {
  likeBtn: '[data-testid=like-selectable]',
  homeGuestText: '[data-testid=home-guest-text]',
  userPost: '[data-testid=user-post]',
  navContainer: '[data-testid=nav-container]',
  guestToast: '[data-testid=guest-toast]',
  headerText: '[data-testid=header-text]',
  topTab: '[data-testid=top-tab]',
  trending: '[data-testid=trending-list-item]',
  newsFullStory: '[data-testid=article-container]',
  newsHeader: '[data-testid=article-top-post]',
  newsPreview: '[data-testid=article-list-post]',
  newsButtonContainer: '[data-testid=article-button-container]'
}

describe('Login redirect tests', () => {

  const session = 'SFMyNTY.g3QAAAABbQAAABZndWFyZGlhbl9kZWZhdWx0X3Rva2VubQAAAVdleUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaGRXUWlPaUowZDJsMGRHVnlZMnh2Ym1VaUxDSmxlSEFpT2pFMk1EZzJPRFl5T0RBc0ltbGhkQ0k2TVRZd09EQTRNVFE0TUN3aWFYTnpJam9pZEhkcGRIUmxjbU5zYjI1bElpd2lhblJwSWpvaU1tTTBZVE13WlRZdFpqZzBOQzAwWldWaUxUZ3dNRFF0WXpZNE1tWTBNV1ptTlRNMElpd2libUptSWpveE5qQTRNRGd4TkRjNUxDSnpkV0lpT2lJeElpd2lkSGx3SWpvaVlXTmpaWE56SW4wLld1b1Rta3NzZC1pcFp0U2ZsUnBRUHNoNVdQMENoS25vMzFrc25HdkRoV0p3cmtmSUoySHh6dmhsNmZkaW5fZG8xRkxucWVQR3ZfQ28wQm10ekoxLWdn.eRB3hhNPUPLNTF5hLL2QRE6Y2wOYG7zIINpmphdUzxI'

  beforeEach(() => {
    cy.server();
    cy.setCookie('_twitterclone_key', session)
    stubAll()
  });

  it('Login from home guest text redirects to home', () => {
    cy.visit('http://localhost:3000/home')
    cy.get(elements.homeGuestText).should('be.visible')
    cy.contains('log in').click()
    cy.get('input').eq(0).type('d1@1.com')
    cy.get('input').eq(1).type('123123')
    cy.contains('Submit').click()
    cy.get(elements.userPost).should('be.visible')
    cy.get(elements.headerText).should('have.text', 'Home')
  })

  it('Login from header guest text redirects to last viewed page', () => {
    cy.visit('http://localhost:3000/home')
    cy.get(elements.homeGuestText).should('be.visible')
    cy.contains('Login/Register').click()
    cy.contains('Sign In').click()
    cy.get('input').eq(0).type('d1@1.com')
    cy.get('input').eq(1).type('123123')
    cy.contains('Submit').click()
    cy.get(elements.userPost).should('be.visible')
    cy.get(elements.headerText).should('have.text', 'Home')
  })

  it('Login from like button guest prompt redirects to last viewed page', () => {
    cy.visit('http://localhost:3000/home')
    cy.get(elements.homeGuestText).should('be.visible')
    cy.get(elements.navContainer).children('div').eq(2).click()
    cy.get(elements.likeBtn).first().click()
    cy.get(elements.guestToast).children('button').eq(1).click()
    cy.get('input').eq(0).type('d1@1.com')
    cy.get('input').eq(1).type('123123')
    cy.contains('Submit').click()
    cy.get(elements.userPost).should('be.visible')
    cy.get(elements.headerText).should('have.text', 'Explore')
  })

  it('Login from trending tab redirects to explore with trending selected', () => {
    cy.visit('http://localhost:3000/home')
    cy.get(elements.homeGuestText).should('be.visible')
    cy.get(elements.navContainer).children('div').eq(2).click()
    cy.get(elements.topTab).eq(1).click()
    cy.contains('Login/Register').click()
    cy.contains('Sign In').click()
    cy.get('input').eq(0).type('d1@1.com')
    cy.get('input').eq(1).type('123123')
    cy.contains('Submit').click()
    cy.get(elements.headerText).should('have.text', 'Explore')
    cy.get(elements.topTab).eq(1).should('have.css', 'background-color', 'rgb(240, 245, 245)')
  })

  it('Login from share article guest prompt redirects to article page', () => {
    cy.visit('http://localhost:3000/home')
    cy.get(elements.homeGuestText).should('be.visible')
    cy.get(elements.navContainer).children('div').eq(2).click()
    cy.get(elements.topTab).eq(2).click()
    cy.get(elements.newsHeader).click()
    cy.get(elements.newsButtonContainer).children('div').click()
    cy.get(elements.guestToast).children('button').eq(1).click()
    cy.get('input').eq(0).type('d1@1.com')
    cy.get('input').eq(1).type('123123')
    cy.contains('Submit').click()
    cy.get(elements.headerText).should('have.text', 'Explore')
    cy.get(elements.newsFullStory).should('be.visible')
  })

})

