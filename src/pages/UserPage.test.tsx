import { render, screen, fireEvent } from '@testing-library/react';
import UserPage from './UserPage';

describe('UserPage', () => {
  const mockSetUsers = vi.fn();
  const defaultUsers = [
    { name: 'Jonas', position: 'Programuotojas', gender: 'Vyras', age: '28' },
  ];

  beforeEach(() => {
    mockSetUsers.mockClear();
  });

  it('renders users in the table', () => {
    render(<UserPage users={defaultUsers} setUsers={mockSetUsers} />);
    expect(screen.getByText('Jonas')).toBeInTheDocument();
    expect(screen.getByText('Programuotojas')).toBeInTheDocument();
  });

  it('shows error if form is submitted with empty fields', () => {
    render(<UserPage users={[]} setUsers={mockSetUsers} />);
    const button = screen.getByRole('button', { name: /pridėti/i });
    fireEvent.click(button);
    expect(screen.getByText(/prašome užpildyti visus laukus/i)).toBeInTheDocument();
  });

  it('adds a user when form is filled correctly', () => {
    render(<UserPage users={[]} setUsers={mockSetUsers} />);
   fireEvent.change(screen.getByPlaceholderText(/vardas/i), {
     target: { value: 'Asta' },
   });
   fireEvent.change(screen.getByPlaceholderText(/pareigos/i), {
     target: { value: 'Vadovė' },
   });
   fireEvent.change(screen.getByPlaceholderText(/amžius/i), {
     target: { value: '34' },
   });
   const genderSelect = screen.getAllByRole('combobox')[2];
   fireEvent.change(genderSelect, { target: { value: 'Moteris' } });

   const button = screen.getByRole('button', { name: /pridėti/i });
   fireEvent.click(button);

    expect(mockSetUsers).toHaveBeenCalled();
  });
});