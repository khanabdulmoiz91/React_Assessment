import { render, screen } from '@testing-library/react';
import App from './App';

test('renders edit instructions', () => {
  render(<App />);
  screen.getByText(/Edit/i);
});
