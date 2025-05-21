import { Box, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BookListView from './BookListView'

const GetAllBooks = () => {
  const user: User | null = useSelector((state: {userReducer: StateType}) => state.userReducer.user)
  const toast = useToast();
  const [books, setBooks] = useState<BookListDetails[]>([])
  const fetchBookDetails = async (): Promise<void>=> {
    try {
      const config = {
        headers: {
          'Content-TYpe': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        }
      }
      const { data } = await axios.get(`http://localhost:2000/api/book/getallbooks`, config)
      setBooks(data)
    } catch (error) {
      toast({
        title: "Error fetching books",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
    }
  }
  useEffect(()=> {
    fetchBookDetails();
  }, [])
  return (
    <Box>
      {
        books.map((book, index)=> (
          <BookListView book={book}/>
        ))
      }
    </Box>
  )
}

export default GetAllBooks
