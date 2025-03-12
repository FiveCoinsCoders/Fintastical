/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { createTestingPinia } from '@pinia/testing';
import { mount } from 'cypress/vue';
import RegisterForm from '../../src/components/auth/RegisterForm.vue';

describe('componenteRegister', () => {
  beforeEach(() => {
    // Simulate that the user is authenticated, depending on how you handle authentication in your store (auth store).
    // Here we will use a mock for authentication.
    cy.intercept('GET', '/api/user', { fixture: 'user.json' }).as('getUser');
    cy.visit('/Register'); // The route where the profile component is located
    cy.wait('@getUser');
  });

  it('Should display the profile information if the user is authenticated', () => {
    // Verify that the user data is loaded correctly
    cy.get('[data-testid="user-greeting"]').should('contain', 'Hello');
    cy.get('[data-testid="user-email"]').should('contain', 'user@example.com');
    cy.get('[data-testid="user-id"]').should('contain', '123');
  });

  it('Should display a form to update the profile', () => {
    // Verify that the update form appears
    cy.get('form').should('be.visible');
    cy.get('input[placeholder="Name"]').should('have.value', 'User');
    cy.get('input[placeholder="Email"]').should('have.value', 'user@example.com');
    cy.get('input[placeholder="Password"]').should('exist');
  });

  it('Should update the profile correctly when the form is submitted', () => {
    // Mock the API call to update the profile
    cy.intercept('POST', '/api/user/update', { statusCode: 200 }).as('updateProfile');

    // Fill out the form
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

    // Verify that no error is displayed
    cy.get('.error').should('not.exist');
  });

  it('Should display an error message if there is a failure when updating the profile', () => {
    // Simulate a failure in updating the profile
    cy.intercept('POST', '/api/user/update', { statusCode: 500 }).as('updateProfileError');

    // Fill out the form
    cy.get('input[placeholder="Name"]').clear().type('New Name');
    cy.get('input[placeholder="Email"]').clear().type('newemail@example.com');
    cy.get('input[placeholder="Password"]').clear().type('newPassword123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the API was called
    cy.wait('@updateProfileError');

    // Verify that an error message is displayed
    cy.get('.error').should('be.visible').and('contain', 'Error updating');
  });

  it('Should display the message that there is no authenticated user if not authenticated', () => {
    // Intercept the request to simulate that there is no authenticated user
    cy.intercept('GET', '/api/user', { statusCode: 401 }).as('getUserNotAuthenticated');
    cy.visit('/profile');
    cy.wait('@getUserNotAuthenticated');

    // Verify that the message about no authentication is displayed
    cy.get('[data-testid="no-auth-message"]').should('be.visible')
      .and('contain', 'You are not authenticated. Please log in.');
  });
});
