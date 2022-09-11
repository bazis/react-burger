
describe('Оформление заказа ', () => {
	it('Страница открывается', () => {
		cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });

		cy.visit('http://localhost:3000');
		cy.contains('Соберите бургер');
	});

	it('Игнредиенты загрузились', () => {
		cy.contains('Краторная булка');
		cy.get('#group_bun');
	});

	it('Открывается модалка с описанием ингредиента', () => {
		cy.get('[data-test=ingredient_container]').first().click();
		cy.get('[data-testid=modal_overlay]').contains('Детали ингредиента').should('exist');
	});

	it('Закрывается модалка с описанием ингредиента', () => {
		cy.get('[data-testid=modal_close_button]').click();
		cy.get('[data-testid=modal_overlay]').should('not.exist');
	});

	it('Логин пользователя', () => {
		cy.intercept('POST', '/api/auth/login', { fixture: 'login.json' });
		cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });

		cy.visit('http://localhost:3000/#/login');

		cy.contains('Вход');
	
		cy.get('input[name=email]').type("test@mail.com");
        cy.get('input[name=password]').type("testpass");
		cy.get('[data-testid=login_submit_button]').click();

	});


	it('Ингредиенты перетаскиваются', () => {
		cy.get('[data-test=ingredient_container]').first().as('bun');
		cy.get('[data-test=ingredient_container]').last().as('main');
		cy.get('[data-testid=cart_drop_target]').as('cart_drop_target');
			
		cy.get('@bun').trigger('dragstart');
		cy.get('@cart_drop_target').trigger('drop');
		cy.get('@main').trigger('dragstart');
		cy.get('@cart_drop_target').trigger('drop');
	});



	it('Заказ оформляется', () => {		
		cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
		window.localStorage.setItem('accessToken', 'aaaaa');
		window.localStorage.setItem('refreshToken', 'rrrrr');

		cy.get('[data-testid="place_order_button"]').click();

		cy.get('[data-testid=modal_close_button]').click();
		cy.get('[data-testid=modal_overlay]').should('not.exist');
	});
})