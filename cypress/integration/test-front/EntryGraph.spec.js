 /*global cy*/
/*Test dentro de la pagina de Home*/ 
describe('EntryGraph', () => {
    beforeEach(() => {
        cy.visit('https://sistema-gestion-paciente.herokuapp.com')
        cy.get('[placeholder="Email"]').type('aldana@gmail.com')
        cy.get('[placeholder="Contraseña"]').type('12345')
        cy.get('[id=btnLogIn]').click().should(() => {
            expect(localStorage.getItem('id')).to.eq('6168c80e4dec28bfe4ff6df0')
        })
        cy.wait(1000)
    })
    /*Se puede ir dentro de ver las estadisticas*/
    it('go to statistics', () => {
        cy.get('[id=statistics]').click()
        cy.contains('Graficos pacientes')
        cy.get('[id=entryGraph]').click()
        cy.contains('Cantidad de pacientes ingresados')
        cy.contains('Últimos 7 días')
    })

}) 