describe("Forms App", () =>{
    beforeEach(() => {
        cy.visit("http://localhost:3000") 
    })
    const textInput = () => cy.get("input[name=username]");
    const emailInput = () => cy.get("input[name=email]");
    const passwordInput = () => cy.get("input[name=password]");
    const tOSInput = () => cy.get("input[name=tOS]")
    const submitBtn = () => cy.get(`button[id="submitBtn"]`)

    it("Sanity Check", () =>{
        expect(1+2).to.equal(3);
    })

    it("Proper elements are showing", () => {
        textInput().should("exist");
        emailInput().should("exist");
        passwordInput().should("exist");
        tOSInput().should("exist");
        submitBtn().should("exist");

        cy.contains(/join/i).should("exist")
    })

    describe("User Actions", () => {
        it("can type in all input fields", () => {
            textInput().should("have.value", "")
            .type("lorem")
            .should("have.value", "lorem");
            emailInput().should("have.value", "")
            .type("lorem@ipsum.com")
            .should("have.value", "lorem@ipsum.com");
            passwordInput().should("have.value", "")
            .type("lorempass1")
            .should("have.value", "lorempass1");
        })
        
        it("can check Terms of Service box", () => {
            tOSInput().should("not.be.checked")
            .check()
            .should("be.checked");
        })

        it("can submit form data when all inputs are filled and ToS is checked", () => {
            textInput().type("lorem")
            emailInput().type("lorem@ipsum.com")
            passwordInput().type("lorempass1")
            tOSInput().check()
            submitBtn().should("not.be.disabled")
            submitBtn().click();

            cy.contains("lorem").should("exist");
        })
    })

    describe("Form Validation example", () => {
        it("Proper message appears when user types into username input, then leaves field empty", () => {
            textInput().type("lorem")
            .type("{selectAll}{backspace}");
            textInput().should("have.value", "");

            cy.contains("Must enter a name to continue.").should("exist");
        })
    })

})