<<<<<<< HEAD

=======
/* eslint-disable no-unused-vars */
//eslint-disable no-unused-vars */
>>>>>>> 5a2ae2a (cambios en tdd)
/* eslint-disable no-undef */
import { createTestingPinia } from '@pinia/testing';
import { mount } from 'cypress/vue';
import ProfileView from '../..//src/components/auth/ProfileView.vue';

<<<<<<< HEAD
describe('ProfileView Component', () => {
  beforeEach(() => {
    mount(ProfileView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: { // Asegúrate de que este nombre coincida con tu store
                user: {
                  email: 'user@example.com',
                  id: '123',
                },
                isAuthenticated: true,
              },
            },
            createSpy: (action) => cy.spy(action),
          }),
        ],
      },
    });
  });

  it('renders the component', () => {
    cy.get('.profile-container').should('exist');
=======

import { createTestingPinia } from '@pinia/testing';
import { mount } from 'cypress/vue';
import Profileview from '../../src/components/auth/Profileview.vue';



describe('componentProfile', () => {
  beforeEach(() => {
    mount(ComponenteProfile, {
      global: {
        plugins: [createTestingPinia({ createSpy: cy.spy })],
      },
    });
>>>>>>> 5a2ae2a (cambios en tdd)
  });
  it('renders correctly', () => {
    cy.contains('').should('exist');
  });
});

  it('Should display the profile information if the user is authenticated', () => {
    cy.get('[data-testid="user-email"]').should('be.visible').and('contain', 'user@example.com');
    cy.get('[data-testid="user-id"]').should('be.visible').and('contain', '123');
  });

  it('Should show a form to update the profile', () => {
    cy.get('form').should('be.visible');
    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
  });
<<<<<<< HEAD
});
=======

  it('Should update the profile correctly when the form is submitted', () => {
    // Mock the API call to update the profile
    cy.intercept('POST', '/api/user/update', { statusCode: 200 }).as('updateProfile');

    // Fill in the form
    cy.get('input[placeholder="Name"]').clear().type('New Name');
    cy.get('input[placeholder="Email"]').clear().type('newemail@example.com');
    cy.get('input[placeholder="Password"]').clear().type('newPassword123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the API was called
    cy.wait('@updateProfile').its('request.body').should('deep.equal', {
      id: '123',
      name: 'New Name',
      email: 'newemail@example.com',
      password: 'newPassword123',
    });

    // Verify that no error is shown
    cy.get('.error').should('not.exist');
  });

  it('Should display an error message if there is a failure when updating the profile', () => {
    // Simulate a failure in the profile update
    cy.intercept('POST', '/api/user/update', { statusCode: 500 }).as('updateProfileError');

    // Fill in the form
    cy.get('input[placeholder="Name"]').clear().type('New Name');
    cy.get('input[placeholder="Email"]').clear().type('newemail@example.com');
    cy.get('input[placeholder="Password"]').clear().type('newPassword123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the API was called
    cy.wait('@updateProfileError');

    // Verify that an error message is shown
    cy.get('.error').should('be.visible').and('contain', 'Error updating profile');
  });

  it('Should display a message that no user is authenticated if not authenticated', () => {
    // Intercept the request to simulate that the user is not authenticated
    cy.intercept('GET', '/api/user', { statusCode: 401 }).as('getUserNotAuthenticated');
    cy.visit('/perfil');
    cy.wait('@getUserNotAuthenticated');

    // Verify that the "not authenticated" message is shown
    cy.get('[data-testid="no-auth-message"]').should('be.visible')
      .and('contain', 'You are not authenticated. Please log in.');
  });

>>>>>>> 5a2ae2a (cambios en tdd)
