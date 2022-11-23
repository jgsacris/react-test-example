import { useEventCallback } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBox } from './SearchBox';
describe('SearchBox', () => {
  it('renders input', async () => {
    const props = {
      term: '',
      onSearch: jest.fn(),
    };
    const { container } = render(<SearchBox {...props}></SearchBox>);
    const input = container.querySelector('input[type="text"]');
    // const input = screen.getByRole('textbox', {
    //   name: /search/i,
    // });

    expect(input).toBeTruthy();
    if (input) {
      await userEvent.type(input, 'domain');
      userEvent.tab();
      expect(props.onSearch).toHaveBeenCalled();
    }
  });
  it('trim empty strings', async () => {
    const props = {
      term: '',
      onSearch: jest.fn(),
    };
    const { container } = render(<SearchBox {...props}></SearchBox>);
    const input = container.querySelector('input[type="text"]');
    expect(input).toBeTruthy();
    if (input) {
      await userEvent.type(input, '  ');
      userEvent.tab();
      expect(props.onSearch).not.toHaveBeenCalled();
    }
  });
});
