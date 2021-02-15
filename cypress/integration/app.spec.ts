// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe("App", function() {
  beforeEach(function() {
    cy.intercept("https://app.fakejson.com/q/0Pm3bJKu?token=HbqwPS-BSqOehLpig2ePqg", { fixture: 'transactions.json' });
    cy.visit("/");
  });

  it("renders the app", function() {

    cy.get(".AccountBalance").should("contain", "$713.12");
    cy.get(".WithdrawalForm").should("contain", "$0.00");

    cy.get(".TxnTable").should('exist');
  });

  it("should show 5 most recent txns", function() {
    cy.get(".TxnTable .MuiDataGrid-row").as('rows');

    cy.get("@rows").first().should("contain", "9");
    cy.get("@rows").first().should("contain", "9:30 Club");
    cy.get("@rows").first().should("contain", "$30.00");

    cy.get("@rows").first().next().should("contain", "8");
    cy.get("@rows").first().next().should("contain", "Arlington Utilities");
    cy.get("@rows").first().next().should("contain", "$120.00");

    cy.get("@rows").first().next().next().should("contain", "7");
    cy.get("@rows").first().next().next().should("contain", "Trader Joe's");
    cy.get("@rows").first().next().next().should("contain", "$67.00");

    cy.get("@rows").first().next().next().next().should("contain", "6");
    cy.get("@rows").first().next().next().next().should("contain", "7 Eleven");
    cy.get("@rows").first().next().next().next().should("contain", "$15.46");

    cy.get("@rows").first().next().next().next().next().should("contain", "5");
    cy.get("@rows").first().next().next().next().next().should("contain", "Sweetgreen");
    cy.get("@rows").first().next().next().next().next().should("contain", "$11.50");

    cy.get("@rows").first().next().next().next().next().next().should("not.exist");

  })
});
