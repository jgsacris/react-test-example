import axios from 'axios';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useRemoteService } from '../hooks/hooks';
import { BookList } from './BookList';
import { BookItem } from '../model/books';
import { TextField } from '@mui/material';
import { SearchBox } from '../components/SearchBox';

export const BookListContainer: FC = () => {
  const { data, loading, error, setPath } = useRemoteService<BookItem[]>(
    'books',
    []
  );

  const [term, setTerm] = useState<string>('');
  useEffect(() => {
    setPath(`books?q=${term}`);
  }, [term]);

  const onSearch = (event: ChangeEvent<HTMLInputElement>) =>
    setTerm(event.target.value);

  return (
    <>
      <SearchBox term={term} onSearch={onSearch}></SearchBox>
      <BookList books={data} loading={loading} error={error}></BookList>
    </>
  );
};
