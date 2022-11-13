
import { Typography} from '@mui/material'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BookListContainer } from './components/BookListContainer'
import {Route, Routes} from 'react-router-dom'
import BookDetailContainer from './components/BookDetailContainer'


function App() {
 
  
  return (
    <div >
      <Typography variant='h2' component='h2' data-test='heading'>Bookish</Typography>
      {/* <BookListContainer></BookListContainer> */}
      <Routes>
        <Route path="/books/:id" element={<BookDetailContainer></BookDetailContainer>}></Route>
        <Route path="/" element={<BookListContainer/>}></Route>
      </Routes>
    </div>
  )
}

export default App
