/// <reference types="cypress"/> 
describe('E2E zlozenie zamowienia Austria', () => {
    it('zlozenie zamowienia', () => {
      cy.visit("/")
      cy.contains(
        '[style="text-transform: unset;"]',
        'Akceptuj wszystkie'
    ).click();
    cy.xpath("//div[@class='v-select vs--single vs--unsearchable']//input[@class='vs__search']").click()
    cy.get('#vs1__option-0').click()
    cy.xpath("//button[@class='btn btn-primary version-switch-modal__submit-button']").click()
    cy.wait(2000)
      cy.get('.form-control.form-field__input.search__input').type('alanda, {enter}', {delay: 100}),
      cy.xpath("//img[@src='https://dev-tatuum.e24files.com/media/res/products/622/16622/520x780/1CQjdp_1.jpg']").click();
      cy.xpath("//span[.='40']").click()
      cy.get('.col-12 > .btn').click()
      cy.get('.mini-basket-buttons > .btn-primary').click()
      cy.get('.btn.btn-primary.w-100.px-3.mb-3').click()
      cy.wait(3000)
      cy.xpath("//button[@class='btn btn-secondary w-100 d-none d-md-block']").click()
      cy.xpath("//div[@class='btn-outline-primary text-center p-3']/div[1]").click()
      cy.xpath("//img[@alt='PayU: Euro']").click()
      cy.enDeliveryAdress('55564', '555654454')
      cy.xpath("//div[@class='delivery-products--sticky']//label[@class='form__checkbox-label']").click()
      cy.get('.pl-sm-3 > .btn').click()
      cy.xpath("//button[@class='btn btn-primary w-100']").click()
      cy.origin('https://merch-prod.snd.payu.com/pay', () => {
      cy.wait(10000)  //wiem ze duzo waitów
      cy.get("#card-number").type('4111 1111 1111 1111')
      cy.get("#card-date").type('12/26')
      cy.get("#card-cvv").type("001")
      cy.get("[name='submit']").click()
      cy.wait(15000) 
      })
      cy.intercept({
        method: 'GET',
        url: 'https://tatuum2.dsdevphp3.m4u.pl/',
        hostname: 'localhost',
      })
      
    })
  })