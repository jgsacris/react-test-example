import { FC } from "react";
import {
  Button, Card, CardActionArea, CardActions, CardContent, Grid,  Typography,
} from '@mui/material';
import { Link} from 'react-router-dom';
import { BookItem } from "../model/books";
import './BookList.css'

export interface BookListParams {
  books:BookItem[],
  loading: boolean,
  error: boolean
}

const classes = {
  root: {
    flexGrow: 1,
  },
  name: {
    maxHeight: 30,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  description: {
    maxHeight: 40,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
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

  return <div data-test='book-list' className="root">
     <Grid container spacing={3}>
  {
    books.map( book =>(
      <Grid item xs={4} sm={4}  className='book-item' key={book.id}>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2' sx={classes.name}>{book.name}</Typography>
              <Typography variant='body2' color='textSecondary' component='p' sx={classes.description}>{book.description}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size='small' color='primary'>
              <Link to={`/books/${book.id}`}>View Details</Link>
            </Button>
          </CardActions>
        </Card>
    </Grid>
    ))
  }
  </Grid>
</div>
}