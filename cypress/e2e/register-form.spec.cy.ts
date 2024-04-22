describe('Форма регистрации', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains(/регистрация/i).click();

    cy.get('[data-testid="register-input-login"]').as('registerInputLogin');
    cy.get('[data-testid="register-input-password"]').as(
      'registerInputPassword'
    );
    cy.get('[data-testid="register-input-password-again"]').as(
      'registerInputPasswordAgain'
    );
    cy.get('[data-testid="register-btn-submit"]').as('registerBtnSubmit');
  });

  it('Вводим не почту - получаем ошибку', () => {
    cy.get('@registerInputLogin').click().type('not_email');
    cy.get('@registerInputPassword').click();

    cy.contains(/используйте почту/i).should('exist');
  });

  it('Маленький пароль - выводится предупреждение', () => {
    cy.get('@registerInputPassword').click().type('1');
    cy.get('@registerInputPasswordAgain').click();

    cy.contains(/минимальная длина/i).should('exist');
  });

  it('Пароли не совпадают - выводится ошибка', () => {
    cy.get('@registerInputPassword').click().type('12345');
    cy.get('@registerInputPasswordAgain').click().type('12345555');
    cy.get('@registerInputLogin').click();

    cy.contains(/не совпадают/i).should('exist');
  });

  it('Регистрация должна работать лишь единожды для почты', () => {
    cy.get('@registerInputLogin').click().type(Cypress.env().login);
    cy.get('@registerInputPassword').click().type(Cypress.env().password);
    cy.get('@registerInputPasswordAgain')
      .click()
      .type('securitypassword12345@');

    cy.get('@registerBtnSubmit').click();

    cy.contains(/такой пользователь уже есть/i).should('exist');
  });
});
