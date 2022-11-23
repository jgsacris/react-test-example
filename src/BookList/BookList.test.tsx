import {render} from '@testing-library/react';
import { BookList, BookListParams} from './BookList';
import {MemoryRouter as Router} from 'react-router-dom';
import { ReactNode } from 'react';

const renderWithRouter = (component:ReactNode) => {
  return {...render(<Router>{component}</Router>)}
}


describe('BookList', () => {
  it('loading', () => {
    const props: BookListParams = {
      loading:true,
      error: false,
      books: []
    }
    const {container} = render(<BookList {...props}/>)
    const content = container.querySelector('p');
    expect (content?.innerHTML).toContain('Loading')
  }),
  it('error', () => {
    const props: BookListParams = {
      loading:false,
      error: true,
      books: []
    }
    const {container} = render(<BookList {...props}/>)
    const content = container.querySelector('p');
    expect (content?.innerHTML).toContain('Error')
  }),
  it('render books', () => {
    const props: BookListParams = {
      loading:false,
      error: false,
      books: [
        {name: 'Refactoring', id: 1},
        {name: 'Domain-driven desing', id: 2},
      ]
    }
    const {container} = renderWithRouter(<BookList {...props}/>);
    const titles = [...container.querySelectorAll('h2')].map(x => x.innerHTML);
    expect(titles).toEqual(['Refactoring', 'Domain-driven desing']);
  })

})