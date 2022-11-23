import axios from "axios";
import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { BookItem } from "../model/books";
import { backendUrl } from "../config";
import { useRemoteService } from "../hooks/hooks";
import BookDetail from "./BookDetail";

const BookDetailContainer: FC = () => {
  let {id} = useParams();
  const {data} = useRemoteService<BookItem>(`books/${id}`, {id:0, name: 'undefined'});    
  return (
    <BookDetail book={data}/>
  )
}

export default BookDetailContainer;