describe("facebookLogin.cy.ts", () => {
  it("log in user by clicking on facebook login", () => {
    cy.visit("http://localhost:3000");

    cy.contains("AGREE AND CONTINUE").click();
    cy.contains("CONNECT WITH FACEBOOK").click();
  });
});
