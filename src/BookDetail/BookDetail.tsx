import { FC } from 'react';
import { BookItem } from '../model/books';

interface BookDetailParams {
  book: BookItem;
}

function getDescription(book: BookItem) {
  let desc = book.description ?? book.name;
  let showMoreLink = false;
  if (desc.length > 300) {
    (desc = desc.substring(0, 300) + '...'), (showMoreLink = true);
  }
  return { desc, showMoreLink };
}

const BookDetail: FC<BookDetailParams> = ({ book }) => {
  const { desc, showMoreLink } = getDescription(book);
  return (
    <div className="detail">
      <h2 className="book-title">{book.name}</h2>
      <p className="book-description">{desc}</p>
      {showMoreLink && <a className="show-more">Show more</a>}
    </div>
  );
};

export default BookDetail;
