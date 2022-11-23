import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useRemoteService } from "../hooks/hooks";
import { BookList } from "./BookList";
import { BookItem} from "../model/books";


export const BookListContainer: FC = () =>{
  const {data, loading, error} = useRemoteService<BookItem[]>('books', [])
 
  return <BookList books={data} loading={loading} error={error}></BookList>
}