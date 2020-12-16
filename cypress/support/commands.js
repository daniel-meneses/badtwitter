// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import * as url from '../constants/urls';
import el from '../constants/elements';

Cypress.Commands.add('stubLogin', () => {
  cy.intercept('POST', url.LOGIN, { fixture: 'login_success.json' })
});

Cypress.Commands.add('stubFetchHomeFeed', () => {
  cy.intercept('GET', url.HOME_FEED, { fixture: 'home_feed.json' })
});

Cypress.Commands.add('stubFetchLikes', () => {
  cy.intercept('GET', url.LIKES, { fixture: 'likes.json' })
});

Cypress.Commands.add('stubFetchTrendingTags', () => {
  cy.intercept('GET', url.TAGS, { fixture: 'tags_group_by_title.json' })
});

Cypress.Commands.add('stubFetchGlobalFeed', () => {
  cy.intercept('GET', url.GLOBAL_FEED, { fixture: 'global_feed.json' })
});

Cypress.Commands.add('stubFetchNewsFeed', () => {
  cy.intercept('GET', url.NEWS_FEED, { fixture: 'news_feed.json' })
});

Cypress.Commands.add('stubFetchFollowers', () => {
  cy.intercept('GET', url.FOLLOWERS, { fixture: 'followers.json' })
});

Cypress.Commands.add('stubFetchSubscriptions', () => {
  cy.intercept('GET', url.SUBSCRIPTIONS, { fixture: 'subscriptions.json' })
});

Cypress.Commands.add('stubFetchSelfProfile', () => {
  cy.intercept('GET', url.SELF_PROFILE, { fixture: 'self_profile_feed.json' })
});

Cypress.Commands.add('stubFetchUserProfileFeed', () => {
  cy.intercept('GET', url.USER_PROFILE, { fixture: 'user_profile_feed.json' })
});

Cypress.Commands.add('stubPostFormRequest', () => {
  cy.intercept('POST', url.POST_FORM, { fixture: 'post_form_success.json' })
});

Cypress.Commands.add('stubLinkPreviewAPI', () => {
  cy.intercept('POST', url.API_LINK_PREVIEW, { fixture: 'post_form_link_preview.json' })
});

Cypress.Commands.add('stubDeleteSubscription', () => {
  cy.intercept('DELETE', url.DELETE_SUBSCRIPTION, { fixture: 'delete_subscription.json' })
});

Cypress.Commands.add('launchAndLogIn', () => {
  cy.visit('http://localhost:3000/login')
  cy.get('input').eq(0).type('d1@1.com')
  cy.get('input').eq(1).type('123123')
  cy.contains('Submit').click()
})

Cypress.Commands.add('logIn', () => {
  cy.get('input').eq(0).type('d1@1.com')
  cy.get('input').eq(1).type('123123')
  cy.contains('Submit').click()
})

Cypress.Commands.add('selectNavAtPosition', (position) => {
  cy.get(el.navContainer).children('div').eq(position).click()
})

Cypress.Commands.add('selectTabAtPosition', (position) => {
  cy.get(el.topTab).eq(position).click()
})

Cypress.Commands.add('getButtonWithtext', (text) => {
  cy.get(el.btn).contains(text)
})

Cypress.Commands.add('getHeaderWithText', (text) => {
  cy.get(el.headerText).contains(text)
})