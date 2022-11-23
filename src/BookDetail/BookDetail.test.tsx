import { Book } from '@mui/icons-material';
import { render } from '@testing-library/react';
import BookDetail from './BookDetail';

describe('Book Detail', () => {
  it('renders title', () => {
    const props = {
      book: {
        id: 1,
        name: 'Refactoring',
      },
    };
    const { container } = render(<BookDetail {...props} />);
    const title = container.querySelector('.book-title');
    expect(title?.innerHTML).toEqual(props.book.name);
  });

  it('renders description', () => {
    const props = {
      book: {
        id: 1,
        name: 'Refactoring',
        description: `Martin Fowler\'s Refactoring defined core ideas and techniques
        that hundreds of thousands of developers have used to improve their software
        `,
      },
    };
    const { container } = render(<BookDetail {...props} />);
    const description = container.querySelector('p.book-description');
    expect(description?.innerHTML).toEqual(props.book.description);
  });

  it('displays the book name when no description was given', () => {
    const props = {
      book: { id: 1, name: 'Refactoring' },
    };
    const { container } = render(<BookDetail {...props} />);
    const description = container.querySelector('p.book-description');
    expect(description?.innerHTML).toEqual(props.book.name);
  });

  it('shows *more* link when description is too long', () => {
    const props = {
      book: {
        id: 1,
        name: 'Refactoring',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque massa eu pulvinar accumsan. Maecenas aliquam cursus orci vitae vestibulum. Donec velit massa, bibendum eget scelerisque non, interdum ac nulla. Cras ullamcorper orci a leo blandit, aliquam elementum nunc aliquam. Maecenas porttitor porta nisi nec sollicitudin. Sed at metus leo. Donec ullamcorper congue tristique. Aenean a ex.',
      },
    };
    const { container } = render(<BookDetail {...props} />);
    const link = container.querySelector('a.show-more');
    const title = container.querySelector('p.book-description');
    expect(link?.innerHTML).toEqual('Show more');
    const section = props.book.description.substring(0, 300);
    expect(title?.innerHTML).toEqual(section + '...');
  });
});
