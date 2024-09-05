import { Avatar, Box, Container, Flex, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ShowallProduct = () => {
    const [books, setBooks] = useState();
    const toast = useToast();
    
    const user = useSelector((state)=> state.userreducer.userInfo)
    const fetchBooks = async()=> {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                }
            }
            const {data} = await axios.get("http://localhost:2000/api/book/getallbooks", config)
            setBooks(data);
        } catch (error) {
            toast({
                title: error.response.data,
                status: "error",
                isClosable: true,
                duration: 5000,
                position: 'bottom'
            })
        }
    }
    useEffect(()=> {
        fetchBooks();
    }, [])  
  return (
    <div>
        <Box bg='black'>
            {
                books ? books.map((book, index)=> (
                    <Box p={4} color='white' display="flex" key={book._id} letterSpacing={2} borderBottomWidth='1px' borderColor="white" marginY={1} cursor='pointer'>
                        <Box width="20%">{book.name}</Box>
                        <Box  width="20%">{book.author}</Box>
                        <Box  width="20%">{book.price}</Box>
                        <Box  width="20%">{book.stock}</Box>
                        <Avatar name="book avatarr" src={book.pic}/>
                    </Box>
                )) : <Box>loading</Box>}

        </Box>
    </div>
  )
}

export default ShowallProduct