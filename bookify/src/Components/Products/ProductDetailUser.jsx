import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, HStack, Image, Tag, TagLabel, useToast, VStack, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../Redux/slicer';

const ProductDetailUser = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState();
    const user = useSelector((state)=> state.userreducer.userInfo);
    const toast = useToast();
    const dispatch = useDispatch()

    const fetchBookDetail = async()=> {
      try {
        setLoading(true);
        const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
          }
      }
      console.log("++++++++++++++++++++", user)
      const {data} = await axios.get(`http://localhost:2000/api/book/bookbyid?id=${params.id}`, config)
      setBook(data);
      setLoading(false)
      } catch (error) {
        toast({
          title: error.response,
          isClosable: true,
          status: "error",
          duration: 5000
        })
        setLoading(false)
      }
    }
    useEffect(()=> {
      fetchBookDetail()
    }, [])

    const addtocardhandler = (event)=> {
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
      {
        book ?
        <Box>
          <Box display={{base: "", md: "flex"}}>
            <Box w={{base: "100%", md: "40%"}}>
              <Image src={book.pic} m={2} borderRadius={10} w="100%"/>
            </Box>
            <Box w={{base: "100%", md: "60%"}} m={10}>
                <HStack>
                  <Tag size="xl" colorScheme='blue' borderRadius="full" p={2}>
                    <TagLabel px={2}>BestSeller</TagLabel>
                  </Tag>
                  <Tag size="xl" colorScheme='blue' borderRadius="full" p={2}>
                    <TagLabel px={2}>New Arrival</TagLabel>
                  </Tag>
                  <Tag size="xl" colorScheme='blue' borderRadius="full" p={2}>
                    <TagLabel px={2}>comic</TagLabel>
                  </Tag>
                </HStack>
              <Text my={2} fontWeight="bold" fontSize="3xl" fontFamily="sans-serif">{book.name}</Text>
              <Text my={2} fontWeight="bold" fontSize="xl" fontFamily="sans-serif">${book.price}</Text>
              <Text my={2} fontWeight="bold" fontSize="xl" fontFamily="sans-serif">This is thest summary provided by author</Text>
              <Text my={2} fontWeight="bold" fontSize="xl" fontFamily="sans-serif">A book by {book.publisher} publication</Text>
              <Button variant='solid' colorScheme='purple' my={5}>
                    Buy now
                </Button>
                <Button variant='ghost' colorScheme='blue' onClick={(event)=>addtocardhandler(event)}>
                    Add to cart
                </Button>
            </Box>
        </Box>
        <Text m={10} fontSize="xl" fontFamily="sans-serif">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis itaque non error numquam ipsum laboriosam pariatur. Voluptatem at dolor suscipit odit, quia officia alias numquam ratione sint asperiores itaque maxime vero. Asperiores dolores vero aspernatur dolorum quod dolorem fuga, dolor libero modi quo a? Odit vitae facere explicabo corporis, rerum perspiciatis neque omnis adipisci. Cumque blanditiis deleniti fuga amet sequi, nihil unde. Quasi voluptatibus iure inventore minus ut voluptates ducimus recusandae obcaecati magni perspiciatis quam sed quibusdam voluptate consectetur eos nemo, beatae vel hic eligendi aliquam dolores itaque a iste! Ab ea, reiciendis sed quod culpa molestias deleniti nesciunt totam?</Text>
      </Box>
      : <div>loading</div>
      }
    </>
  )
}

export default ProductDetailUser