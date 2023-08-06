it("titles are correct", () => {
  const page = cy.visit("http://localhost:3000");

  page.get("title").should("contain", "Oscar te Giffel");
  page.get("h1").should("contain.text", "Oscar te Giffel");
});
