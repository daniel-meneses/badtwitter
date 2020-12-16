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

Cypress.Commands.add('stubLogin', () => {
  cy.route('POST', '/api/v1/accounts/session', 'fixture:login_success.json').as('stubLogin');
});

Cypress.Commands.add('stubLoginFailure', () => {
  cy.route({
      method: 'POST',
      url: '/api/v1/accounts/session',
      status: 421,
      response: 'fixture:login_failure.json',
  }).as('stubLoginFailure');
});

Cypress.Commands.add('stubPostLike', () => {
  cy.route({
      method: 'POST',
      url: '/api/v1/like',
      response: 'fixture:like.json',
  }).as('stubPostLike');
});

Cypress.Commands.add('stubDeleteLike', () => {
  cy.route({
      method: 'DELETE',
      url: '/api/v1/like/delete',
      response: 'fixture:like.json',
  }).as('stubDeleteLike');
});


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



