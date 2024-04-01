import SuccessSnackbar from '../../src/components/success-snackbar';

describe('SuccessSnackbar.cy.tsx', () => {
  it('playground', () => {
    const setIsOpen = cy.spy().as('setIsOpen');

    cy.mount(
      <SuccessSnackbar
        buttonText={'Закрыть'}
        isOpen={true}
        setIsOpen={setIsOpen}
      />
    );
    cy.get('button').should('have.text', 'Закрыть');
    cy.get('button').click();

    cy.get('@setIsOpen').should('have.been.calledWith', false);
  });
});
