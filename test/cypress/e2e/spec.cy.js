import { faker } from '@faker-js/faker';

import * as steps from '../support/steps';

let cardData;

describe('Payment Element', () => {

  beforeEach(() => {
    cy.intercept('https://r.stripe.com/0', (req) => {
        req.headers['origin'] = 'https://js.stripe.com'
    })

    cy.intercept('https://js.stripe.com/v3', (req) => {
        req.on('response', (res) => {
            res.body = res.body.replaceAll('window.top', 'window.self')
        })
    })
})

  it('Should not find any Invalid/Hardcoded PubKey in the BeforeAll Hook Check:3.0', () => {
    // This TC is a placeholder for displaying the Help Text in case the learner has hardcoded the PubKey.
  });


  it('Should load Stripe Payment Element', () => {
    cy.visit('http://localhost:4242/')
    steps.verifyStipeElements();
  })

  it('should submit Payment using invalid card', () => {
    cy.visit('http://localhost:4242/')
    
    cy.fixture('cards.json').then(function (testdata) {
      cardData = testdata;

      const invalidCard = cardData.visa.credit.invalid;
      steps.performCheckout(
        faker.internet.email(), 
        invalidCard.card_declined.cardNumber, 
        '11/' + faker.number.float({ 'min': 24,'max': 30 }), 
        invalidCard.card_declined.cvv, 
      );
      steps.submitPurchase();
      steps.confirmCardDecline();
      cy.wait(5000)
    }) 
  })

  it('Should submt payment using a 3DS Card:3.22', () => {
    const valid3DSCard = cardData.visa.credit.valid.threeDS;

    cy.visit('http://localhost:4242/')
    steps.performCheckout(
      faker.internet.email(), 
      valid3DSCard.cardNumber, 
      '11/' + faker.number.float({ 'min': 24,'max': 30 }), 
      valid3DSCard.cvv, 
    );
    steps.submitPurchase();
    cy.wait(10000);
    steps.approve3DS();
    steps.confirmSuccessfulPayment();
    cy.wait(5000)
  });

  it('Should submt payment using a non 3DS Card:3.21', () => {
      const validCard = cardData.visa.credit.valid;

    cy.visit('http://localhost:4242/')
    steps.performCheckout(
        faker.internet.email(), 
        validCard.cardNumber, 
        '11/' + faker.number.float({ 'min': 24,'max': 30 }), 
        validCard.cvv, 
    );
    steps.submitPurchase();
    steps.confirmSuccessfulPayment();
    cy.wait(5000)
  });

})