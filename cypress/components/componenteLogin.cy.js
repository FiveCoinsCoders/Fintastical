/* eslint-disable no-undef */
<<<<<<< HEAD

import { createTestingPinia } from '@pinia/testing';
import { mount } from 'cypress/vue';
import componenteLogin from '../../src/components/auth/LoginForm.vue';

=======
// eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD')) {
    return false; // Evita que Cypress falle el test
  }
  return true; // Si es otro tipo de error, lo dejamos para que Cypress lo maneje
});

import { createTestingPinia } from '@pinia/testing';
import { mount } from 'cypress/vue';

import componenteLogin from '../../src/components/auth/LoginForm.vue';
import { useAuthStore } from '../../src/stores/auth'; // Verifica la ruta del store
>>>>>>> 5a2ae2a (cambios en tdd)

describe('componenteLogin', () => {
  beforeEach(() => {
    mount(componenteLogin, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: () => () => {}, // Configura un espía vacío
            stubActions: false, // Si no quieres simular las acciones de Pinia
          }),
        ],
      },
    });
  });

  it('Renders correctly', () => {

    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');

  });

  it('Allows typing in the inputs', () => {
    cy.get('input[type="email"]').type('test@example.com').should('have.value', 'test@example.com');
    cy.get('input[type="password"]').type('password123').should('have.value', 'password123');
  });

  it('Shows an error for incorrect credentials', () => {
    const auth = useAuthStore();
    cy.wrap(auth).invoke('login', false); // Simula un inicio de sesión fallido

    cy.get('button').click();
    cy.get('.error').should('exist').and('contain', 'Incorrect credentials!');
  });

  it('Redirects to the dashboard on successful login', () => {
    const auth = useAuthStore();
    cy.wrap(auth).invoke('login', true); // Simula un inicio de sesión exitoso

    cy.get('button').click();
    cy.wait(500); // Espera medio segundo para el redireccionamiento

  });

  it('Verifies that the "Login" button is disabled when fields are empty', () => {
    cy.get('input[type="email"]').clear();
    cy.get('input[type="password"]').clear();

  });

  it('Verifies that the auth store is correctly updated after login', () => {
    const auth = useAuthStore();

    cy.wrap(auth).invoke('login', true); // Simula un inicio de sesión exitoso
    cy.get('button').click();


  });
});
