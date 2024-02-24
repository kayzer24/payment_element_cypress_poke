import { faker } from '@faker-js/faker';

import * as steps from '../support/steps';

let cardData;

describe('Payment Element', () => {

  it('Should not find any Invalid/Hardcoded PubKey in the BeforeAll Hook Check:3.0', () => {
    // This TC is a placeholder for displaying the Help Text in case the learner has hardcoded the PubKey.
  });


  it('Should load Stripe Payment Element', () => {
    cy.visit('http://localhost:4242/')
    steps.verifyStipeElements();
  })

  it('should submit checkout', () => {
    cy.visit('http://localhost:4242/')
    
    cy.fixture('cards.json').then(function (testdata) {
      cardData = testdata;

      const validCard = cardData.visa.credit.valid;
      steps.performCheckout(
        faker.internet.email(), 
        validCard.cardNumber, 
        '11/' + faker.number.float({ 'min': 24,'max': 30 }), 
        validCard.cvv, 
      );
      steps.submitPurchase();
      cy.wait(7500)
    }) 
  })

})