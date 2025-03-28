import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Mars weather title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Latest Weather at Elysium Planitia/i);
  expect(titleElement).toBeInTheDocument();
});
