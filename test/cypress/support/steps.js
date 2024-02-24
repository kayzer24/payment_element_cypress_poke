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
};

export const verifyStipeElements = () => {
    verifyStipeLib();
    getIframe('.__PrivateStripeElement iframe',0).find('input[name=email]').should('be.visible').should('have.value', '');
    getIframe('.__PrivateStripeElement iframe',1).find('input[name=number]').should('be.visible').should('have.value', '');
    getIframe('.__PrivateStripeElement iframe',1).find('input[name=expiry]').should('be.visible').should('have.value', '');
    getIframe('.__PrivateStripeElement iframe',1).find('input[name=cvc]').should('be.visible').should('have.value', '');
}

export const verifyStipeLib = () => {
    cy.get('iframe[src*="https://js.stripe.com/"]').its('0.contentDocument').should('exist');
    cy.get(".StripeElement").should('have.value', '');
};

export const submitPurchase = () => {
    cy.get('#submit').should('be.enabled').click();
};