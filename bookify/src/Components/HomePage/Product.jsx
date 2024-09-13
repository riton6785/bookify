import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Box, useToast } from '@chakra-ui/react';
import ProductCard from './ProductCard';
import { setCart} from "../../Redux/slicer"

const Product = () => {
    const [books, setBooks] = useState();
    const toast = useToast();
    const dispatch = useDispatch();
    
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
            console.log(data)
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
    const addtocardhandler = (book, event)=> {
        event.stopPropagation();
        dispatch(setCart(book))
        toast({
            title: "Added to cart succesfully",
            status: "success",
            isClosable: true,
            duration: 5000,
            position: 'bottom'
        })
    }
  return (
    <>
        <Box display="flex"
  flexWrap="wrap"
  flexDirection="row"
  margin={0}
  backgroundColor="black"
>
            {
                books ? books.map((book)=> (
                    <Box key={book._id}
                    flexBasis={{ base: '100%', md: '50%', lg: '25%' }}
                    p={2}
            >
                        <ProductCard book = {book} addtocardhandler={addtocardhandler}/>
                    </Box>
                )):<div>loading</div>
            }

        {/* {cart} */}
        </Box>
    </>
  )
}

export default Product