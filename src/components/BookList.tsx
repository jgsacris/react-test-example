import { FC } from "react";
import { BookItem } from "../model/books";

export interface BookListParams {
  books:BookItem[],
  loading: boolean,
  error: boolean
}

export const BookList:FC<BookListParams> = ({books, loading, error}) => {

  if(loading){
    return <p>Loading...</p>
  }

  if(error){
    return <p>Error!</p>
  }
  books.sort((a, b) => {
    if(a.id < b.id){
      return -1
    }
    if(a.id > b.id){
      return 1
    }
    return 0
  })

  return <div data-test='book-list'>
  {
    books.map( book =>(
    <div className='book-item' key={book.id}>
      <h2 className='title'>{book.name}</h2>
      <a href={`/books/${book.id}`}>View Details</a>
    </div>
    ))
  }
</div>
}