class myAccount {
	login(email, password) {
			cy.contains(
				'[style="text-transform: unset;"]',
				'Akceptuj wszystkie'
				).click();
				cy.get('.btn.btn-primary.version-switch-modal__submit-button').click()
				cy.get('.header-options > .nav > :nth-child(2) > .no-hover > .icon-profile').click()
				cy.get('#InputEmail').type(email)
				cy.get('#InputPsw').type(password)
				cy.get('.form > .d-flex > .btn').click()
				cy.wait(2000);					
	}
	changePassword(email, password, newPassword) {
				cy.get('.header-options > .nav > :nth-child(2) > .no-hover > .icon-profile').click()
				cy.get("[href='/myAccount/passwordChange']").click()
				cy.get("[name='password']").type(password)
				cy.get("[name='passwordNew']").type(newPassword)
				cy.get("[name='passwordNewRetype']").type(newPassword)
				cy.get("[action='/myAccount/ajax/personalData/passwordChange'] .btn").click()
				cy.get("[href='/access/logout']").click()
				cy.clearAllSessionStorage()
				cy.clearAllCookies()
				cy.reload()
				cy.contains(
					'[style="text-transform: unset;"]',
					'Akceptuj wszystkie'
					).click();
					cy.get('.btn.btn-primary.version-switch-modal__submit-button').click()
				cy.get('.header-options > .nav > :nth-child(2) > .no-hover > .icon-profile').click({force:true})
				cy.get('#InputEmail').clear().type(email)
				cy.get('#InputPsw').clear().type(newPassword)
				cy.get('.form > .d-flex > .btn').click()						
	}
	returnPassword(password, newPassword) {
				cy.get('.header-options > .nav > :nth-child(2) > .no-hover > .icon-profile').click()
				cy.get("[href='/myAccount/passwordChange']").click()
				cy.get("[name='password']").type(password)
				cy.get("[name='passwordNew']").type(newPassword)
				cy.get("[name='passwordNewRetype']").type(newPassword)
				cy.get("[action='/myAccount/ajax/personalData/passwordChange'] .btn").click()						
	}

	closeTab ()  {
		cy.contains(
			'[style="text-transform: unset;"]',
			'Akceptuj wszystkie'
		).click();
		cy.get('.btn.btn-primary.version-switch-modal__submit-button').click()
		cy.wait(2000);
}
	editMydata(userName, userSurname){
		cy.get('.header-options > .nav > :nth-child(2) > .no-hover > .icon-profile').click()
      cy.get("[name='forename']").clear().type(userName)
      cy.get("[name='surname']").clear().type(userSurname)
      cy.get("[name='phone']").clear().type("750350450")
      cy.get("[name='date_of_birth']").clear().type("1990-05-05")
      cy.xpath("//button[@class='btn btn-secondary']").click()
      cy.get('.alert > .d-inline-block').should('be.visible')
	  cy.get("[name='forename']").should('have.value', userName)
      cy.get("[name='surname']").should('have.value', userSurname)
	}
	editAdress(street, buildNumber, flatNumber, postcode, city){
		cy.get('.header-options > .nav > :nth-child(2) > .no-hover > .icon-profile').click()
      cy.get("[href='/myAccount/address']").click()
      cy.xpath("//a[contains(.,'Edytuj')]").click()
      cy.get("[name='forename']").clear().type("Janusz")
      cy.get("[name='surname']").clear().type("Testingu")
      cy.get("[name='city']").clear().type(city)
      cy.get("[name='postcode']").clear().type(postcode)
      cy.get("[name='street']").clear().type(street)
      cy.get("[name='building_number']").clear().type(buildNumber)
      cy.get("[name='flat_number']").clear().type(flatNumber)
      cy.get("[name='surname']").clear().type("Testingu")
cy.get(".vs__search").click()
cy.get('#vs1__option-0').click()
        cy.get(".btn-primary[type='button']").click()
        cy.xpath("//div[@class='alert alert-dismissible alert-success']").should('be.visible')
		cy.get("p:nth-of-type(4)").should('contain', postcode +' '+city)
		cy.get("p:nth-of-type(3)").should('contain', street+' '+buildNumber+'/'+flatNumber)
		cy.get("p:nth-of-type(4)").should('contain', postcode+' '+city)
	}
	priceAssertion ()  {
		cy.wait(1000).then(()=>{
		  cy.document().then(doc=>{
			const promoPrice = doc.querySelector('.product-card__price span.price-promo span.price')?.innerHTML.trim()
			const regularPrice = doc.querySelector('.product-card__price span.price:not(span.price-promo span.price)')?.innerHTML.trim()
			const currentPrice = promoPrice||regularPrice
			console.log(promoPrice, regularPrice);
			cy.get(".product-card__add-basket-button").click()
			cy.get(".flex-wrap.flex-grow-1 > .list-item__prices > .text-nowrap > .price").should('contain', currentPrice)
		  })
		})
	}

	ifExist (select, clickIfExist, clickIfNotExist){
		cy.get('body')
			.then($body => {
			  if ($body.find(select).length) {
				return clickIfExist;
			  }
			  return clickIfNotExist;
			})
		.then(selector => {
			cy.get(selector).click({force: true});
			
	})}
	enDeliveryAdress (postcode, phone) {
		cy.get("[name='forename']").type('Janusz')
		cy.get("[name='surname']").type('Testowy')
		cy.get("[name='company']").type('media4u')
		cy.get("[name='email']").type('jmajerski15@dkj.m4u.pl')
		cy.get("[name='street']").type('testowaUlica')
		cy.get("[name='building_number']").type('11')
		cy.get("[name='flat_number']").type('14')
		cy.get("[name='city']").type('Łódź')
        cy.get("[name='postcode']").type(postcode)
		cy.get("[name='phone']").type(phone)
}
	bok (imageName, imagePath) {
		cy.wait(2000)
		cy.get('.header-options > .nav > :nth-child(2) > .no-hover > .icon-profile').click()
		cy.xpath("//a[.='BOK']").click()
		cy.xpath("//a[.='dodaj zgłoszenie']").click()
		cy.xpath("//input[@class='vs__search']").click()
        cy.contains('[class="vs__dropdown-option"]', 'Zapytaj o produkt').click()
		cy.get('.form > .form-container > :nth-child(2) > .form-control').type("<script>alert('test');</script>")
        cy.xpath("//input[@name='files']").attachFile(imagePath)
        cy.xpath("//button[@class='btn btn-primary']").click()
		cy.xpath("//div[@class='d-inline-block']").should('contain', 'Zgłoszenie zostało dodane')
		cy.get('tbody > :nth-child(1) > :nth-child(2)').should('contain', 'Zapytaj o produkt')
		cy.get('tbody > :nth-child(1) > :nth-child(2)').click()
		cy.get('.card-body').should('not.contain', '</script>')
		cy.get(':nth-child(3) > .card-body').should('contain', imageName)

	}









}
export default new myAccount();
