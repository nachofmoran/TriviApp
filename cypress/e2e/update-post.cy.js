/// <reference types="Cypress" />

describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:8080");
    cy.get("#1").click();
    cy.get("#title").clear().type("New title");
    cy.get("#content-input").type("Updated content");
    cy.get("#update-btn").click();
    cy.get("#1").click();
    cy.get("#title").should("have.value", "New title");
  });
});
