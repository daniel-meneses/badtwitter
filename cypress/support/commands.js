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

Cypress.Commands.add('stubGlobalFeed', () => {
  cy.route('GET', '/api/v1/feed/global', 'fixture:global_feed.json').as('stubGlobalFeed');
});

Cypress.Commands.add('stubUserProfile', () => {
  cy.route('GET', '/api/v1/user/39', 'fixture:user_profile.json').as('stubUserProfile');
});
