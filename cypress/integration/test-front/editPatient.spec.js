describe('Attended Patient', () => {
    beforeEach(() => {
        cy.visit('https://sistema-gestion-paciente.herokuapp.com')
    })

    it('add test patient', () => {
        cy.visit('https://sistema-gestion-paciente.herokuapp.com');
        cy.get('[placeholder="Email"]').type('aldana@gmail.com');
        cy.get('[placeholder="Contraseña"]').type('12345');
        cy.contains('Iniciar sesion').click();
        cy.contains('Agregar un paciente').click();
        cy.get('[id= ControlTextAreaNN1]').type("Test");
        cy.get('[id= ControlTextAreaNN2]').type("Front");
        cy.get('[id= ControlTextAreaNN3]').type("38694960");
        cy.get('[id= ControlTextAreaNN4]').type("Buenos Aires");
        cy.get('[id= ControlTextAreaNN5]').type("Florencio Varela");
        cy.get('[id= ControlTextAreaNN6]').type("fake street");
        cy.get('[id= ControlTextAreaNN7]').type("575");
        cy.get('[id= ControlTextAreaNN8]').type("1");
        cy.get('[id= ControlTextAreaNN9]').type("1888");
        cy.get('input[name= Fiebre]').check();
        cy.get('input[name= Tos]').check();
        cy.get('[id= ingresarButton]').click();
        cy.contains(`Paciente Test Front ingresado con Exito!`);  
    })

    it('can edit patient',() => {
        cy.visit('https://sistema-gestion-paciente.herokuapp.com');
        cy.get('[placeholder="Email"]').type('a@gmail.com')
        cy.get('[placeholder="Contraseña"]').type('12345')
        cy.get('[id=btnLogIn]').click().should(() => {
            expect(localStorage.getItem('id')).to.eq('614f9117cd2f4a0f81ca23fa')
        })
        cy.wait(1000)
       cy.request('GET', 'https://sistema-gestion-paciente.herokuapp.com/api/pacientes-esperando-atendiendose').then((response) => {
            cy.get(`[id=Attending${response.body.data.length - 1}]`).click()
            for (let index = 1; index < 10; index++) {
                cy.get(`[id= ControlTextAreaNN${index}]`).should('be.disabled');
            }
            cy.get('[id=editButton]').click()
            cy.get('[id= ControlTextAreaNN6]').type(" new");
            cy.get('[id=editingButton]').click()
            cy.contains('Paciente Test Front actualizado correctamente!') 
       })
    })
    
    it('Delete new patient of Test', () => {
        cy.request('GET', 'https://sistema-gestion-paciente.herokuapp.com/api/pacientes-esperando-atendiendose').then((response) => {
            let patient = response.body.data.find(p=> p.name == 'Test')
            cy.request('DELETE', 'https://sistema-gestion-paciente.herokuapp.com/api/borrarPaciente/' + patient._id)
                 .then((response) =>{
                     expect(response.body).to.have.property('response', 'Paciente eliminado correctamente!')
                 })
         })
    })
})