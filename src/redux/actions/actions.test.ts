import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'jest-mock-axios';

import { setSearchTerm, fetchBooks } from './actions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('BookListContainer related actions', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('Fetches data successfully', () =>{
    const books= [
      { id: 1, name: 'Refactoring' },
      { id: 2, name: 'Domain-driven design' },
      ];
    mockAxios.get.mockResolvedValueOnce({data:books})

    const expectedActions = [
      { type: 'FETCH_BOOKS_PENDING'},
      { type: 'FETCH_BOOKS_SUCCESS', books}
    ];

    const store = mockStore({books: []});
    return store.dispatch(fetchBooks('')as any).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('Sets the search keyword', () => {
    const term = '';
    const expected = {
      type: 'SET_SEARCH_TERM',
      term
    }
    const action = setSearchTerm(term);
    expect(action).toEqual(expected);
  });
})