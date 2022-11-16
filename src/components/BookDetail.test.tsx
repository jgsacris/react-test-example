import {render} from '@testing-library/react';
import BookDetail from './BookDetail';

describe('Book Detail', () => {
  it('renders title', () => {
    const props = {
      book : {
        id: 1,
        name: 'Refactoring'
      }
    }
    const container = render(<BookDetail {...props}/>);
    const title = container.querySelector('.book-title');
    expect(title.innerHTML).toEqual(props.book.name)
  }
  )
});