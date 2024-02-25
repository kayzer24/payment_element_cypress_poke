// Helper method to get body of iframe which is not empty
const getIframe = (selector, index) => {
    return cy
    .get(selector, { timeout: 40000 })
    .eq(index, {log:false})
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap);
};


export const performCheckout = (email, cardNumber, expDate, cvc) => {
    getIframe('.__PrivateStripeElement iframe', 0).find('input[name=email]').type(email);
    getIframe('.__PrivateStripeElement iframe', 1).find('input[name=number]').type(cardNumber);
    getIframe('.__PrivateStripeElement iframe', 1).find('input[name=expiry]').type(expDate);
    getIframe('.__PrivateStripeElement iframe', 1).find('input[name=cvc]').type(cvc);
    getIframe('.__PrivateStripeElement iframe',1).find('select[name=country]').select('GB');
    getIframe('.__PrivateStripeElement iframe', 1).find('input[name=postalCode]').type('WC2N 4AZ')
};

export const verifyStipeElements = () => {
    verifyStipeLib();
    getIframe('.__PrivateStripeElement iframe',0).find('input[name=email]').should('be.visible').should('have.value', '');
    getIframe('.__PrivateStripeElement iframe',1).find('input[name=number]').should('be.visible').should('have.value', '');
    getIframe('.__PrivateStripeElement iframe',1).find('input[name=expiry]').should('be.visible').should('have.value', '');
    getIframe('.__PrivateStripeElement iframe',1).find('input[name=cvc]').should('be.visible').should('have.value', '');
    getIframe('.__PrivateStripeElement iframe',1).find('select[name=country]').should('be.visible').should('have.value', 'FR');
    getIframe('.__PrivateStripeElement iframe',1).find('select[name=country]').select('GB');
    getIframe('.__PrivateStripeElement iframe',1).find('input[name=postalCode]').should('be.visible').should('have.value', '');
}

export const verifyStipeLib = () => {
    cy.get('iframe[src*="https://js.stripe.com/"]').its('0.contentDocument').should('exist');
    cy.get(".StripeElement").should('have.value', '');
};

export const submitPurchase = () => {
    cy.get('#submit').should('be.enabled').click();
};

export const approve3DS = () => {
    cy.get('iframe', { timeout: 20 * 1000 }).first().getiFrameBody(() => {
      cy.get('iframe[id="challengeFrame"]', { timeout: 10 * 1000 }).first().getiFrameBody(() => {
          cy.get("#test-source-authorize-3ds").click();
      });
    });
};

export const confirmSuccessfulPayment = () => {
    cy.get('#messages', { timeout: 10000 }).should('be.visible').should('include.text', 'Payment succeeded');
}

export const confirmCardDecline = () => {
    cy.get('#messages', { timeout: 10000 }).should('be.visible').should('include.text', 'card_declined');
}