/// <reference types="cypress"/> 
const imageName = 'chocolate.jpg'
const imagePath = '../fixtures/'+ imageName

describe('E2E wysylka zgloszenia z zalacznikiem', () => {
	it('wysylka do BOK', () => {
		cy.visit('https://tatuum2.dsdevphp3.m4u.pl/');
		cy.contains(
			'[style="text-transform: unset;"]',
			'Akceptuj wszystkie'
		).click();
		cy.get('.btn.btn-primary.version-switch-modal__submit-button').click()
        cy.get('.header-options > .nav > :nth-child(2) > .no-hover > .icon-profile').click()
		cy.get('#InputEmail').type('jmajerski01@dkj.m4u.pl')
		cy.get('#InputPsw').type('Listopad2022{enter}')
		cy.wait(3000)
		cy.get('.header-options > .nav > :nth-child(2) > .no-hover > .icon-profile').click()
		cy.xpath("//a[.='BOK']").click()
		cy.xpath("//a[.='dodaj zgłoszenie']").click()
		cy.xpath("//input[@class='vs__search']").click()
        //mialem duzy problem z zapytaj o produkt, chcialem uzyc cy.get('#vs2__option-0') ale nie bylo to stabilne, raz dzialalo raz nie
        cy.contains('[class="vs__dropdown-option"]', 'Zapytaj o produkt').click()
		cy.get('.form > .form-container > :nth-child(2) > .form-control').type("<script>alert('test');</script>")
        cy.xpath("//input[@name='files']").attachFile(imagePath)
        cy.xpath("//button[@class='btn btn-primary']").click()
		cy.xpath("//div[@class='d-inline-block']").should('contain', 'Zgłoszenie zostało dodane')
		cy.get('tbody > :nth-child(1) > :nth-child(2)').should('contain', 'Zapytaj o produkt')
		cy.get('tbody > :nth-child(1) > :nth-child(2)').click()
		cy.get('.card-body').should('not.contain', '</script>')
		cy.get(':nth-child(3) > .card-body').should('contain', imageName)
		   
	});
});