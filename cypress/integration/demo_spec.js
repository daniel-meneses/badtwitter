
describe('When home loaded', () => {

  const session = 'SFMyNTY.g3QAAAACbQAAABZndWFyZGlhbl9kZWZhdWx0X3Rva2VubQAAAVhleUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaGRXUWlPaUowZDJsMGRHVnlZMnh2Ym1VaUxDSmxlSEFpT2pFMU9UazFOREUyTlRJc0ltbGhkQ0k2TVRVNU9Ea3pOamcxTWl3aWFYTnpJam9pZEhkcGRIUmxjbU5zYjI1bElpd2lhblJwSWpvaU5EZGpNREkwTVRndE1XWTVOQzAwTXpBd0xUbGpPVFl0WkRnNVkySmlZbVF4WWpReElpd2libUptSWpveE5UazRPVE0yT0RVeExDSnpkV0lpT2lJek9TSXNJblI1Y0NJNkltRmpZMlZ6Y3lKOS5mUnJvUzZJeV9rdC1UMDRPSVRxMGRaVFloaTJWa3ZQMzJUbkR5cWFmTlktQmZEamxySlVjWHh5eFQ3OTBQM1oxUlF0MC1wajFKOHJXZjJtRnlaRTNaUW0AAAANdG9rZW5fcmVmcmVzaG0AAAFaZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhkV1FpT2lKMGQybDBkR1Z5WTJ4dmJtVWlMQ0psZUhBaU9qRTJNRGcyTVRNMk5USXNJbWxoZENJNk1UVTVPRGt6TmpnMU1pd2lhWE56SWpvaWRIZHBkSFJsY21Oc2IyNWxJaXdpYW5ScElqb2laRFZpWTJNNVpqTXRaREk0WVMwME5XWTBMVGt4WVRFdFpEQXpNRGhsTWpBek1HWm1JaXdpYm1KbUlqb3hOVGs0T1RNMk9EVXhMQ0p6ZFdJaU9pSXpPU0lzSW5SNWNDSTZJbkpsWm5KbGMyZ2lmUS42ZnM1VEpRWEpGLUVfMVpBSE9xZXV0VXRFemxldUNJRDctdmU3QmZ5Y1BMVl9BX1ZUMGZoYVQxRzk4OEwxYmZlWG1jN2VNOUZaSUlRN3I3ZnljX005Zw.7cO6dtEUA-VKGIPXcC_X2EcNsL0HUetyA8oHbgc46Tk'

  beforeEach(() => {
    cy.server();
    cy.route({
      url: '**/api/v1/feed/global',
      method: 'GET',
    }).as('globalFeed');
    cy.setCookie('_twitterclone_key', session)
  });

  it('then global feed displayed', () => {
    cy.visit('http://localhost:3000/home') // change URL to match your dev URL
    cy.get('div[class="post_mini_component"]').should('be.visible')
  })

  it('then trending items displayed', () => {
    cy.visit('http://localhost:3000/home') // change URL to match your dev URL
    cy.get('div[class="trending_item"]').should('be.visible')
  })

})

describe('When global feed post', () => {

  const session = 'SFMyNTY.g3QAAAACbQAAABZndWFyZGlhbl9kZWZhdWx0X3Rva2VubQAAAVhleUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaGRXUWlPaUowZDJsMGRHVnlZMnh2Ym1VaUxDSmxlSEFpT2pFMU9UazFOREUyTlRJc0ltbGhkQ0k2TVRVNU9Ea3pOamcxTWl3aWFYTnpJam9pZEhkcGRIUmxjbU5zYjI1bElpd2lhblJwSWpvaU5EZGpNREkwTVRndE1XWTVOQzAwTXpBd0xUbGpPVFl0WkRnNVkySmlZbVF4WWpReElpd2libUptSWpveE5UazRPVE0yT0RVeExDSnpkV0lpT2lJek9TSXNJblI1Y0NJNkltRmpZMlZ6Y3lKOS5mUnJvUzZJeV9rdC1UMDRPSVRxMGRaVFloaTJWa3ZQMzJUbkR5cWFmTlktQmZEamxySlVjWHh5eFQ3OTBQM1oxUlF0MC1wajFKOHJXZjJtRnlaRTNaUW0AAAANdG9rZW5fcmVmcmVzaG0AAAFaZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhkV1FpT2lKMGQybDBkR1Z5WTJ4dmJtVWlMQ0psZUhBaU9qRTJNRGcyTVRNMk5USXNJbWxoZENJNk1UVTVPRGt6TmpnMU1pd2lhWE56SWpvaWRIZHBkSFJsY21Oc2IyNWxJaXdpYW5ScElqb2laRFZpWTJNNVpqTXRaREk0WVMwME5XWTBMVGt4WVRFdFpEQXpNRGhsTWpBek1HWm1JaXdpYm1KbUlqb3hOVGs0T1RNMk9EVXhMQ0p6ZFdJaU9pSXpPU0lzSW5SNWNDSTZJbkpsWm5KbGMyZ2lmUS42ZnM1VEpRWEpGLUVfMVpBSE9xZXV0VXRFemxldUNJRDctdmU3QmZ5Y1BMVl9BX1ZUMGZoYVQxRzk4OEwxYmZlWG1jN2VNOUZaSUlRN3I3ZnljX005Zw.7cO6dtEUA-VKGIPXcC_X2EcNsL0HUetyA8oHbgc46Tk'

  beforeEach(() => {
    cy.server();
    cy.setCookie('_twitterclone_key', session)
  });


  it('like icon toggled then fill changes green and white', () => {
    cy.route({
      url: '**/api/v1/like',
      method: 'POST',
      state: 200
    }).as('postLike');

    cy.route({
      url: '**/api/v1/like/delete',
      method: 'DELETE',
      state: 200
    }).as('deleteLike');

    cy.visit('http://localhost:3000/home') // change URL to match your dev URL

    let likeBtn = cy.get(`span[class="like_button"]`).eq(3)
    let style = likeBtn.children('svg').children('g')
    style.should('have.attr', 'fill', 'white')
    likeBtn.click()
    style.should('have.attr', 'fill', 'green')
    cy.wait('@postLike')
    likeBtn = cy.get(`span[class="like_button"]`).eq(3)
    style = likeBtn.children('svg').children('g')
    likeBtn.click()
    style.should('have.attr', 'fill', 'white')
    cy.wait('@deleteLike')
  })


  it('disiked then icon turns transparent', () => {
    cy.visit('http://localhost:3000/home') // change URL to match your dev URL
    cy.get('div[class="trending_item"]').should('be.visible')
  })

  it('username selected then user profile displayed', () => {
    cy.visit('http://localhost:3000/home') // change URL to match your dev URL
    cy.get('div[class="trending_item"]').should('be.visible')
  })

  it('avatar selected then user image overlay displayed', () => {
    cy.visit('http://localhost:3000/home') // change URL to match your dev URL
    cy.get('div[class="trending_item"]').should('be.visible')
  })

})

//expect($el).to.be.visible

describe('When login', () => {

  let cat

  beforeEach(() => {
    cy.server();
  });

  it('fields incomplete then submit button disabled', () => {
    cy.visit('http://localhost:3000/login') // change URL to match your dev URL
    cy.get('input[value="Submit"]').should('be.disabled')
  })

  it('fails due to password then error displayed', () => {
    cy.visit('http://localhost:3000/login') // change URL to match your dev URL
    cy.get('input[id="email"]').type("deep@gmail.com")
    cy.get('input[id="password"]').type("123456")
    cy.get('input[value="Submit"]').click()
    cy.get('div[class="login_fail_message"]').should('have.text', 'Incorrect email or password')
    cy.url().should('include', '/login')
  })

  it('succeeds then home displayed', () => {
    cy.visit('http://localhost:3000/login') // change URL to match your dev URL
    cy.get('input[id="email"]').type("deep@gmail.com")
    cy.get('input[id="password"]').type("123123")
    cy.get('input[value="Submit"]').click()
    cy.url().should('include', '/home')
  })


  it('succeeds then global feed fetched', () => {
    cy.route({
      url: '**/api/v1/feed/global',
      method: 'GET',
    }).as('globalFeed');

    cy.visit('http://localhost:3000/login') // change URL to match your dev URL
    cy.get('input[id="email"]').type("deep@gmail.com")
    cy.get('input[id="password"]').type("123123")
    cy.get('input[value="Submit"]').click()
    cy.wait('@globalFeed')
      .then((xhr) => {
        cy.log(xhr.request.headers)
      //  cy.log(JSON.stringify(xhr.response.body))
      });
  })

  it('succeeds then likes fetched', () => {
    cy.route({
      url: '**/api/v1/like',
      method: 'GET',
    }).as('likes');

    cy.visit('http://localhost:3000/login') // change URL to match your dev URL
    cy.get('input[id="email"]').type("deep@gmail.com")
    cy.get('input[id="password"]').type("123123")
    cy.get('input[value="Submit"]').click()
    cy.wait('@likes')
      .then((xhr) => {
        cy.log(xhr.request.headers)
      //  cy.log(JSON.stringify(xhr.response.body))
      });
  })

  it('subscriptions fetched', () => {
    cy.route({
      url: '**/api/v1/subscription?accepted=true',
      method: 'GET',
    }).as('subscriptions');

    cy.visit('http://localhost:3000/login') // change URL to match your dev URL
    cy.get('input[id="email"]').type("deep@gmail.com")
    cy.get('input[id="password"]').type("123123")
    cy.get('input[value="Submit"]').click()
    cy.wait('@subscriptions')
      .then((xhr) => {
        cy.log(xhr.request.headers)
      //  cy.log(JSON.stringify(xhr.response.body))
      });
  })

  it('subscription requests fetched', () => {
    cy.route({
      url: '**/api/v1/subscription?accepted=false',
      method: 'GET',
    }).as('subRequests');

    cy.visit('http://localhost:3000/login') // change URL to match your dev URL
    cy.get('input[id="email"]').type("deep@gmail.com")
    cy.get('input[id="password"]').type("123123")
    cy.get('input[value="Submit"]').click()
    cy.wait('@subRequests')
      .then((xhr) => {
        cy.log(xhr.request.headers)
      //  cy.log(JSON.stringify(xhr.response.body))
      });
  })

})


/*
Cypress.Commands.add('stubHomescreen', (): void => {
  cy.route('/oz/containers*', 'fixture:homescreen_data.json').as('stubHomescreen');
});
*/

/*
describe('Fire: Active And Referred Events', () => {
    beforeEach(() => {
      cy.server();
      cy.stubHomescreen();
      cy.route({
        url: '/analytics-ingestion/v2/single-event',
        method: 'POST',
        status: 200,
        response: {},
        onRequest: (req) => {
          subject.next(req.request.body.event);
        },
      }).as('analytics');
    });

    it('Should trigger active event', () => {
      cy.visit('/');
      cy.wait('@analytics')
        .then((xhr: Cypress.WaitXHR) => {
          if (typeof xhr.request.body === 'object') {
            const event = xhr.request.body.event;
            // temporary solution until we figure out how to use jest and chai expect in the same project
            (expect(event) as any).to.eql({ active: {} });
          }
        });
    });

    it('Should trigger referred event when URL is deeplinked', () => {
      const { testContentPlayerUrl } = TEST_EPISODE;
      const referredType = {
        campaign: 'campaign',
        medium: 'medium',
        source: 'source',
        referred_type: 'DEEP_LINK',
      };
      const output = {
        ...referredType,
        video_player_page: {
            video_id: parseInt(TEST_EPISODE_ID, 10),
        },
      };
      const isReferredEventPromise = gotAnalyticsRequest(subject, 'referred', output);

      cy.visit(`${testContentPlayerUrl}?utm_source=${referredType.source}&utm_medium=${referredType.medium}&utm_campaign=${referredType.campaign}`);
      cy.url().should('eq', buildUrl(`/${testContentPlayerUrl}?utm_source=${referredType.source}&utm_medium=${referredType.medium}&utm_campaign=${referredType.campaign}`));

      return isReferredEventPromise;
    });
});

*/
