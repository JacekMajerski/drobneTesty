/// <reference types="cypress"/> 
describe('E2E rejestracja uzytkownika', () => {
    it('rejestracja', () => {
     cy.visit("https://konto.onet.pl/signin?state=https%3A%2F%2Fpoczta.onet.pl%2F&client_id=poczta.onet.pl.front.onetapi.pl")
        cy.xpath("//input[@id='email']").type('testowycypressowy@poczta.onet.eu')
        cy.get('.cmp-intro_acceptAll').click()
        cy.xpath("//input[@id='password']").type('Maj20233')
        cy.get('.sc-a7eb406c-10 > .sc-ca90c2ac-0').click()
        cy.get("[placeholder='Szukaj wiadomości']").type('Aktywacja konta klienta{enter}')
        cy.get('.subjectStyles__Snippet-ormima-4 > :nth-child(1) > :nth-child(1)').click()
        cy.wait(1000)
        cy.contains("https://www.tatuum.com/access/registration_step2").click()
        //cy.contains('Aktywacja konta klienta').click()
    })
  })