import { FC } from "react";
import { BookItem } from "../model/books";

interface BookDetailParams {
  book: BookItem
}

const BookDetail:FC<BookDetailParams> = ({book}) => {
  return (
    <div className="detail">
      <h2 className="book-title">{book.name}</h2>
    </div>
  )
}

export default BookDetail;