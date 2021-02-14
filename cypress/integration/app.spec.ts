// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe("App", function() {
  beforeEach(function() {
    cy.visit("/");
  });

  it("renders the app", function() {
    // how to point to env vars?
    cy.get(".AccountBalance").should("contain", "$2,000.00");
    cy.get(".WithdrawalForm").should("contain", "$0.00");
    cy.get(".TxnTable").should("contain", "No rows");
  });

});
