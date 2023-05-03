/// <reference types="Cypress" />

describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:8080");
    cy.get("#1").click();
    cy.get("#delete-btn").click();
    cy.get("#1").should("not.exist");
  });
});
