/// <reference types="Cypress" />

describe("play, score 1 and submit score", () => {
  it("passes", () => {
    cy.visit("http://localhost:8080");

    cy.get(".home__link").click();
    cy.get('[type="radio"].question__answer').check("true");
    cy.get("#answer-btn").click();
    cy.get('[type="radio"].question__answer').check("false");
    cy.get("#answer-btn").click();
    cy.get("#playerinput").type("Cypress");
    cy.get("#submit-btn").click();
  });
});
