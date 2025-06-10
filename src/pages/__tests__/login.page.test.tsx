import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../login.page';
import store from '../../context/store';

describe('LoginPage', () => {
  it('shows the login form', () => {
    // Render the login page
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    
    // Check if the login heading is visible
    expect(screen.getByText('Login')).toBeInTheDocument();
    
    // Check if the username input is present
    expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
    
    // Check if the password input is present
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    
    // Check if the login button is present
    expect(screen.getByText('login')).toBeInTheDocument();
  });
}); 
