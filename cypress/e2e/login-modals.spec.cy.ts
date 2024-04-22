describe('Тестирование действий логинизации', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Должны быть кнопки входа и регистрации', () => {
    cy.contains(/вход/i).should('exist');
    cy.contains(/регистрация/i).should('exist');
  });

  it('При нажатии на кнопку входа должна открываться модалка', () => {
    cy.contains(/вход/i).click();
    cy.get('[data-testid="login-modal"]').should('exist');
    cy.contains(/войти/i).should('be.disabled');
  });

  it('При нажатии на кнопку регистрации должна открываться модалка', () => {
    cy.contains(/регистрация/i).click();
    cy.get('[data-testid="register-modal"]').should('exist');
    cy.contains(/Зарегистрироваться/i).should('be.disabled');
  });

  it('При нажатии на крестик модалка авторизации должна закрываться', () => {
    cy.contains(/вход/i).click();
    cy.get('[data-testid="close-modal"]').click();
    cy.get('[data-testid="login-modal"]').should('not.exist');
  });

  it('При нажатии на крестик модалка регистрации должна закрываться', () => {
    cy.contains(/регистрация/i).click();
    cy.get('[data-testid="close-modal"]').click();
    cy.get('[data-testid="register-modal"]').should('not.exist');
  });
});
