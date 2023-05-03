/// <reference types="Cypress" />

describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:8080");
    cy.get("#title").type("New post");
    cy.get("#content-input").type("This is a test post");
    cy.get("#add-btn").click();
    cy.get("#101").should("exist");
  });
});
