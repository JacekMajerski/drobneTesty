/// <reference types="cypress"/> 

//const { contains } = require("cypress/types/jquery");

describe('E2E zlozenie zamowienia', () => {
    it('zlozenie zamowienia',() => {
      cy.visit("/")
      cy.login('jmajerski01@dkj.m4u.pl', 'Listopad2022');
      cy.get(".header-nav [href='https://tatuum2.dsdevphp3.m4u.pl/ona'] > span").trigger('mouseenter')
      cy.xpath("//a[@href='https://tatuum2.dsdevphp3.m4u.pl/ona/ubrania/spodnie-damskie']").click()
      cy.get("[src='https://dev-tatuum.e24files.com/media/res/products/420/17420/520x780/sSIOzg_1.jpg']").click()
      //cy.xpath("//h1[@class='product-card__title']").should('contain', 'spodnie damskie denim SARO')
      cy.get(".nav-pills > li:nth-of-type(4) span").click()
      cy.wait(1000).then(()=>{
        cy.document().then(doc=>{
        
          const promoPrice = doc.querySelector('.product-card__price span.price-promo span.price')?.innerHTML.trim()
          const regularPrice = doc.querySelector('.product-card__price span.price:not(span.price-promo span.price)')?.innerHTML.trim()
          const currentPrice = promoPrice||regularPrice
          console.log(promoPrice, regularPrice);
          cy.get(".product-card__add-basket-button").click()
          cy.xpath("//ul[@class='list-unstyled text-left px-3 pb-4']/li[1]//td[@class='pr-2 pb-2']//span[@class='price']").should('contain', currentPrice)
          cy.get('.mini-basket-buttons > .btn-primary').click()
          cy.xpath("//div[@class='d-flex flex-wrap']/div[@class='list-item__attr d-none d-lg-block']//span[@class='price']").should('contain', currentPrice)
          cy.document().then(doc=>{
          const finalPrice = doc.querySelector('.flex-wrap > .mr-0 > :nth-child(2) > .list-item__prices > .price-promo > .price')?.innerHTML.trim()
          console.log(finalPrice);
         cy.get('[style="color: rgb(0, 0, 0);"] > :nth-child(2) > .float-right > .price').should('contain', finalPrice)
         cy.get('.order-sm-last > .btn').click()
         cy.xpath("//div[@class='d-flex flex-wrap']/div[@class='list-item__attr d-none d-lg-block']//span[@class='price']").should('contain', currentPrice)
         cy.get(".mr-0.d-none .list-item__prices > .text-nowrap > .price").should('contain', finalPrice)
         cy.get("li:nth-of-type(4) .price").should('contain', finalPrice)
        })
        })
      })
     
        
       /* cy.get('.btn.btn-primary.product-card__add-basket-button').click()
        cy.xpath("//h2[@class='h4']").should('contain', 'spodnie damskie denim SARO')
        cy.get('.basket-product-attr').should('contain', '38')
        cy.get(".flex-wrap.flex-grow-1 > .list-item__prices > .text-nowrap > .price").eq('contain', '38')
        //jak pobrac cene z karty produktu, przypisac jej zmienna i pozniej
        //porownac tą zmienna do wartosci w koszyku?
      */
      })
  })