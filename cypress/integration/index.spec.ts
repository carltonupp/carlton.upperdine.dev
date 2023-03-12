/// <reference types="cypress" />

context("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should render correctly and display my social links", () => {
    const img = cy.get("img");
  });
});

export {};
