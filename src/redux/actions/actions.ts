import axios from 'axios';
import { Dispatch } from 'react';
import {backendUrl} from '../../config';
import { BookItem } from '../../model/books';


enum Actions {
  SET_SEARCH_TERM= 'SET_SEARCH_TERM',
  FETCH_BOOKS_PENDING = 'FETCH_BOOKS_PENDING',
  FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS'
}

type FetchBooksPendingType = {
  type: Actions.FETCH_BOOKS_PENDING
}

type FetchBooksSuccessType = {
  type: Actions.FETCH_BOOKS_SUCCESS,
  books: BookItem[]
}

export const setSearchTerm = (term: string ) => {
  return { type: 'SET_SEARCH_TERM', term}
}

export const fetchBooks = (q?: string) => {
  return(dispatch:Dispatch<FetchBooksPendingType | FetchBooksSuccessType>) => {
    dispatch({type: Actions.FETCH_BOOKS_PENDING});
    return axios.get(`${backendUrl}books`).then((res) => {
      dispatch({type: Actions.FETCH_BOOKS_SUCCESS, books:res.data});
    })

  }
}


