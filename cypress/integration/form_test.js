describe("Forms App", () =>{
    beforeEach(() => {
        cy.visit("http://localhost:3000") 
    })
    const textInput = () => cy.get("input[name=username]");
    const emailInput = () => cy.get("input[name=email]");
    const passwordInput = () => cy.get("input[name=password]");

    it("Sanity Check", () =>{
        expect(1+2).to.equal(3);
    })

    it("Proper elements are showing", () => {
        textInput().should("exist");
        emailInput().should("exist");
        passwordInput().should("exist");

        cy.contains(/join/i).should("exist")
    })

    describe("User Actions", () => {
        it("can type in username field", () => {
            textInput().should("have.value", "")
            .type("lorem")
            .should("have.value", "lorem");
        })
    })

})