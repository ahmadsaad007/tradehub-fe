import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  test('navigates to the correct URL on search', () => {
    const mockNavigate = jest.fn();  // Mock the navigate function
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByText('Search');

    // Simulate typing into the search box
    fireEvent.change(input, { target: { value: 'test query' } });

    // Simulate clicking the search button
    fireEvent.click(searchButton);

    // Check if the navigation occurred with the correct query
    expect(mockNavigate).toHaveBeenCalledWith('/sch/test query');
  });
});
