/// <reference types="cypress"/>
import procesZakupowyCy from "../../../support/page-object/procesZakupowy.cy";
describe('E2E zlozenie zamowienia', () => {
	it('zlozenie zamowienia', () => {
		cy.visit('/');
		cy.login('jmajerski01@dkj.m4u.pl', 'Listopad2022');
		cy
			.get('.form-control.form-field__input.search__input')
			.type('alanda, {enter}', { delay: 100 }),
			cy
				.xpath(
					"//img[@src='https://dev-tatuum.e24files.com/media/res/products/622/16622/520x780/1CQjdp_1.jpg']"
				)
				.click();
		cy.xpath("//span[.='40']").click();
		cy.priceAssertion()
		cy.xpath("//a[contains(.,'Idź do koszyka')]").click();
		cy.xpath("//div[@class='btn btn-primary w-100 px-3 mb-3']").click();
		cy.wait(1000)
		cy.xpath("//img[@alt='DPD']").click();
		cy.xpath("//img[@alt='Przelewy24 - karta płatnicza, Google Pay, raty']").click();
		cy.get(':nth-child(4) > .btn-outline-primary').click();
		cy.xpath(
			"//div[@class='btn-outline-primary text-center position-relative active']"
		).click();
		cy.xpath(
			"//label[contains(.,'* Zapoznałam(em) się z treścią regulaminu sklepu i akceptuję jego postanowienia.')]"
		).click();
		cy.get('.order-sm-last.btn').click();
		cy.xpath("//button[@class='btn btn-primary w-100']").click();
		//cy.visit("https://sandbox-go.przelewy24.pl/trnRequest/")

		cy.wait(10000); //wiem ze duzo waitów
		cy.origin('https://sandbox-go.przelewy24.pl', () => {
			//cy.wait(7000)  //wiem ze duzo waitów
			cy.get("[alt='Płacę z iPKO (PKO BP)']").click();
		});
		cy.origin('https://vsa.przelewy24.pl/', () => {
			//cy.wait(5000)  //wiem ze duzo waitów
			cy.get('#user_account_pbl_correct').click();
		});
		cy.get('.py-3 > p').should('contain', 'Transakcja została zaakceptowana');
	});
});
//cy.xpath("//button[@id='user_account_pbl_correct']").click()
//cy.xpath("//p[contains(.,'Transakcja została zaakceptowana')]").should('contain', 'Transakcja została zaakceptowana')
