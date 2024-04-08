describe('Тестирование главной страницы', () => {
  it('Должны быть кнопки входа и регистрации', () => {
    cy.visit('/');

    cy.contains(/вход/i).should('exist');
    cy.contains(/регистрация/i).should('exist');
  });

  it('При нажатии на кнопку входа должна открываться модалка', () => {
    cy.visit('/');

    cy.contains(/вход/i).click();
    cy.get('[data-testid="login-modal"]').should('exist');
    cy.contains(/войти/i).should('be.disabled');
  });

  it('При нажатии на крестик модалка должна закрываться', () => {
    cy.visit('/');

    cy.contains(/вход/i).click();
    cy.get('[data-testid="close-modal"]').click();
    cy.get('[data-testid="login-modal"]').should('not.exist');
  });
});
