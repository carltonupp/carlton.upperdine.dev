describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("contains an image", () => {
    cy.get("img").should("exist");
  });

  it("contains three social links", () => {
    cy.get("a.social-icon").should("have.length", 3);
  });

  it("contains a header saying recent posts", () => {
    cy.get("h1:first").should("have.text", "Recent Posts");
  });
});

export {};
