describe('Форма входа в аккаунт', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains(/вход/i).click();

    cy.get('[data-testid="auth-input-login"]').as('authInputLogin');
    cy.get('[data-testid="auth-input-password"]').as('authInputPassword');
    cy.get('[data-testid="auth-btn-submit"]').as('authBtnSubmit');
  });

  it('При вводе не почты - появляется ошибка', () => {
    cy.get('@authInputLogin').click().type('not_email');
    cy.get('@authInputPassword').click();

    cy.contains(/используйте почту/i).should('exist');
  });

  it('При вводе маленького пароля - появляется ошибка', () => {
    cy.get('@authInputPassword').click().type('1');
    cy.get('@authInputLogin').click();

    cy.contains(/минимальная длина/i).should('exist');
  });

  it('Логинизация должна работать', () => {
    cy.get('@authInputLogin').click().type(Cypress.env().login);
    cy.get('@authInputPassword').click().type(Cypress.env().password);

    cy.get('@authBtnSubmit').click();

    cy.contains(/успешно/i).should('exist');
  });
});
