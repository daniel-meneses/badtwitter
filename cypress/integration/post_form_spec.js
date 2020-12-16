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
}

describe('Post form tests', () => {

  beforeEach(() => {
    cy.clearCookies();
    stubAll()
  });

  it('Submit post form from home feed', () => {
    cy.launchAndLogIn()
    cy.get('main').within(() => {
      cy.get(elements.userPost).should('be.visible')
      cy.contains('Submit').should('have.css', 'opacity', '0.5')
      cy.get(elements.postForm).type('test message').should('have.text', 'test message')
      cy.contains('Submit').not('have.css', 'opacity', '0.5')
      cy.contains('Submit').click()
      cy.get(elements.postForm).should('have.text', '')
      cy.contains('Submit').should('have.css', 'opacity', '0.5')
      cy.get(elements.userPost).eq(0).within(() => {
        cy.contains('test message')
      })
    })
  })

  it('Submit post form from navigation new post icon', () => {
    cy.launchAndLogIn()
    cy.get(elements.navContainer).children('div').last().click()
    cy.get(elements.floatingPostForm).within(() => {
      cy.get(elements.postForm).should('be.visible')
      cy.contains('Submit').should('have.css', 'opacity', '0.5')
      cy.get(elements.postForm).type('test message').should('have.text', 'test message')
      cy.contains('Submit').not('have.css', 'opacity', '0.5')
      cy.contains('Submit').click()
      cy.get(elements.postForm).not('be.visible')
    })
    cy.get('main').within(() => {
      cy.get(elements.userPost).eq(0).within(() => {
        cy.contains('test message')
      })
    })
  })

})

