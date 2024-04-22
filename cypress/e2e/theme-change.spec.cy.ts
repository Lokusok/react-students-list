describe('Тема меняется', () => {
  it('При клике на тему - она должна изменяться', () => {
    cy.visit('/');
    cy.get('[data-testid="theme-toggler"]').first().click();

    cy.get('html').invoke('attr', 'data-mui-color-scheme').should('eq', 'dark');

    cy.get('[data-testid="theme-toggler"]').first().click();
    cy.get('html')
      .invoke('attr', 'data-mui-color-scheme')
      .should('eq', 'light');
  });
});
