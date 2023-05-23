/// <reference types="cypress"/> 
describe('E2E zlozenie zamowienia', () => {
    it('zlozenie zamowienia', () => {
      cy.visit("/")
      cy.login('jmajerski05@dkj.m4u.pl', 'Listopad2022');
      cy.get('.form-control.form-field__input.search__input').type('alanda, {enter}', {delay: 100}),
      cy.xpath("//img[@src='https://dev-tatuum.e24files.com/media/res/products/622/16622/520x780/1CQjdp_1.jpg']").click();
      cy.xpath("//span[.='40']").click()
      cy.priceAssertion()
      cy.xpath("//a[contains(.,'Idź do koszyka')]").click()
      cy.xpath("//div[@class='btn btn-primary w-100 px-3 mb-3']").click()
      cy.wait(2000)
      cy.xpath("//div[.='Odbiór w salonie']").click()
      cy.xpath("//img[@alt='Płatność przy odbiorze']").click()

      cy.ifExist(":nth-child(4) > .my-account__link", ":nth-child(4) > .my-account__link", "[aria-label='Mapa'] div:nth-of-type(13) > [alt]")
      cy.wait(2000)
      cy.ifExist("[aria-label='Mapa'] div:nth-of-type(13) > [alt]", '[style="width: 50px; height: 56px; overflow: hidden; position: absolute; cursor: pointer; touch-action: none; left: -115px; top: -140px; z-index: -84;"] > img', '.invoice-container > .basket-h2')
      cy.wait(1000)
      //cy.get("[aria-label='Mapa'] div:nth-of-type(3) > div:nth-of-type(1) > div").click()
      cy.ifExist("[aria-label='Mapa'] > div > div > div > div:nth-of-type(5) > div", "[aria-label='Mapa'] > div > div > div > div:nth-of-type(5) > div", '[style="margin: 0px -10px;"] > :nth-child(1) > .btn-outline-primary')
      cy.wait(1500)
      //cy.ifExist("[tabindex='0'][title] > [alt]", "[tabindex='0'][title] > [alt]", '[style="margin: 0px -10px;"] > :nth-child(1) > .btn-outline-primary')
      cy.wait(1500)
      cy.ifExist(".text-center > .btn", ".text-center > .btn", '[style="margin: 0px -10px;"] > :nth-child(1) > .btn-outline-primary')
      cy.wait(1500)
      //cy.get("[tabindex='0'][title] > [alt]").click()
      cy.get(".position-relative.btn-outline-primary .mb-1").click() //button od wybrania zapisanego wczesniej adresu. Jesli to nowy klient bez zapisanego adresu zamowienia - nie zadziała.
      cy.get(".mt-0 .row li:nth-of-type(1)").should('contain', 'BYDGOSZCZ FOCUS')
      cy.xpath("//label[contains(.,'* Zapoznałam(em) się z treścią regulaminu sklepu i akceptuję jego postanowienia.')]").click()
      cy.xpath("//div[@class='btn-outline-primary text-center position-relative active']").click()
      cy.xpath("//button[@class='btn btn-primary order-sm-last w-100 px-3 mb-3']").click()
      cy.xpath("//button[@class='btn btn-primary w-100']").click()
      cy.get('.px-4 > .purchase__title').should('contain', 'Dziękujemy za zakupy. Cieszymy się, że jesteś z nami')
      
    })
  })

