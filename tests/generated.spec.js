Here are the complete Playwright test scripts in JavaScript for the given user story:


import { test, expect } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // Fill email field with valid email
  await page.fill('#email-input', 'user@example.com');
  
  // Fill password field with valid password
  await page.fill('#password-input', 'valid-password');
  
  // Click login button
  await page.click('#login-button');
  
  // Verify dashboard is displayed after successful login
  expect(await page.url()).toBe('https://example.com/dashboard');
});

test('login with invalid credentials', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // Fill email field with valid email
  await page.fill('#email-input', 'user@example.com');
  
  // Fill password field with invalid password
  await page.fill('#password-input', 'invalid-password');
  
  // Click login button
  await page.click('#login-button');
  
  // Verify error message is displayed for invalid credentials
  expect(await page.textContent('#error-message')).toContain('Invalid email or password');
});

test('email format validation', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // Fill email field with invalid email format
  await page.fill('#email-input', 'invalid-email');
  
  // Verify error message is displayed for invalid email format
  expect(await page.textContent('#error-message')).toContain('Invalid email format');
});

test('password cannot be empty', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // Fill password field with empty string
  await page.fill('#password-input', '');
  
  // Verify login button is disabled if password is empty
  expect(await page.querySelector('#login-button')).toBeDisabled();
});

test('five failed login attempts', async ({ page }) => {
  for (let i = 0; i < 5; i++) {
    await page.goto('https://example.com/login');
    
    // Fill email field with valid email
    await page.fill('#email-input', 'user@example.com');
    
    // Fill password field with invalid password
    await page.fill('#password-input', 'invalid-password');
    
    // Click login button
    await page.click('#login-button');
  }
  
  // Verify error message is displayed after five failed login attempts
  expect(await page.textContent('#error-message')).toContain('Too many failed login attempts');
});

test('forgot password link', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // Click forgot password link
  await page.click('#forgot-password-link');
  
  // Verify reset page is displayed after clicking forgot password link
  expect(await page.url()).toBe('https://example.com/reset-password');
});