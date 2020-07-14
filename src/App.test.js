import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import App from './App';

test('renders page with router', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Add Contact/i);
  expect(linkElement).toBeInTheDocument();
});
