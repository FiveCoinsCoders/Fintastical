
/* eslint-disable no-undef */
import { createTestingPinia } from '@pinia/testing';
import { mount } from 'cypress/vue';
import ProfileView from '../..//src/components/auth/ProfileView.vue';

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
});