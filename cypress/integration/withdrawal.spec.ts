// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('ATM Withdrawal', function() {

  before(() => {
    cy.intercept("https://app.fakejson.com/q/0Pm3bJKu?token=HbqwPS-BSqOehLpig2ePqg", { fixture: 'transactions.json' });
    cy.visit('/');
  });

  beforeEach(() => {
    cy.get('.WithdrawalForm .SubmitBtn').as('$submitBtn');
    cy.get('.WithdrawalForm .AmountValue').as('$amountValue');
    cy.get('span.MuiSlider-thumb').as('$slider');
    cy.get('@$slider')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: -1000 })
      .trigger('mouseup');
  });

  it('start with disabled withdraw with amount at $0.00', function() {
    // non-zero value required to withdraw
    cy.get('@$amountValue').should('contain', '$0.00');
    cy.get('@$submitBtn').should('be.disabled');
  });

  it('hover on withdrawal amount shows tooltip indicating increment limitation: "Limited to $20.00 increments."', function() {
    cy.get('.AmountValue .DisplayValue').trigger('mouseover');
    cy.get('.MuiTooltip-tooltip').should('contain', 'Limited to $20.00 increments. Daily max withdrawal $2,000.00');
    cy.get('.AmountValue .DisplayValue').trigger('mouseout');
  });

  it('slider updates values and unlocks withdraw btn', function() {
    expect(this.$slider.attr('aria-valuenow')).equal('0');

    // move slider to near full
    cy.get('@$slider')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 200 });

    cy.get('@$amountValue').should('contain', '$300.00');

    // disabled until value is registered
    cy.get('@$submitBtn').should('be.disabled');
    cy.get('@$slider').trigger('mouseup');
    cy.get('@$submitBtn').should('not.have.disabled');

    // max out the account
    cy.get('@$slider')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 600 })
      .trigger('mouseup');

    cy.get('@$amountValue').should('contain', '$2,000.00');
    cy.get('@$submitBtn').should('be.disabled');
  });

  it('withdraw valid amount below remaining balance ($713.12), update account balance, and update list of transactions', function() {

    cy.get('@$slider')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 200 })
      .trigger('mouseup');

    // before txn
    cy.get('@$amountValue').should('contain', '$300.00');
    cy.get('@$submitBtn').click();

    // after txn
    cy.get('@$amountValue').should('contain', '$0.00');
    cy.get('.AccountBalance').should('contain', '$413.12');

    // check txn made it in list
    cy.get('.TxnTable').should('contain', 'ATM Cash Withdrawal');
    cy.get('.TxnTable').should('contain', '$300.00');

  });

  it('attempt to withdraw invalid amount beyond remaining balance ($413.12) should notify user', function() {

    cy.get('@$slider')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 500 })
      .trigger('mouseup');

    // attempt txn
    cy.get('@$amountValue').should('contain', '$1,880.00');
    cy.get('@$submitBtn').should('be.disabled');
    cy.get('.OverdraftMsg').should('contain', 'Overdraft of -$1,466.88');

    // noop
    cy.get('@$amountValue').should('contain', '$1,880.00');
    cy.get('.AccountBalance').should('contain', '$413.12');

  });
});
