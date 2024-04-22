describe('Действия авторизованного пользователя', () => {
  before(() => {
    cy.visit('/');
    cy.contains(/вход/i).click();

    cy.get('[data-testid="auth-input-login"]')
      .click()
      .type(Cypress.env().login);
    cy.get('[data-testid="auth-input-password"]')
      .click()
      .type(Cypress.env().password);

    cy.get('[data-testid="auth-btn-submit"]').click();
  });

  it('Переход на страницу студентов работает', () => {
    cy.contains(/лента студентов/i)
      .closest('a')
      .click();
  });
});
