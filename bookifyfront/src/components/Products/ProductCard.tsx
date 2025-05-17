import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, HStack, Image, Stack, Text, useToast } from "@chakra-ui/react"

import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const ProductCard = ({book, key}: {book: Book, key: number}) => {
  const user: User | null = useSelector((state: {userReducer: StateType})=> state.userReducer.user)
  const dispatch = useDispatch();
  const toast = useToast();
  const addToCart =() => {
    console.log("add to cart", user)
    if(!user) {
      toast({
        title: "Please Login to add items to cart",
        status: "error",
        isClosable: true,
        position: "top"
      })
    }
  }
  return (
    <Card maxW='sm' key={key} alignItems={"center"} justifyContent={"center"}>
      <Link to={`/book/${book._id}`}>
        <CardBody>
          <Image
            src={book.pic}
            alt='Green double couch with wooden legs'
            borderRadius='lg'
            width={"100%"}
            height={"200px"}
            objectFit="cover"
            mx="auto"
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{book.name}</Heading>
            <Text color='blue.600' fontSize='2xl'>
              {book.price}
            </Text>
            <Text color='blue.600' fontSize='2xl'>
              {book.publisher}
            </Text>
            <Text>
              {book.description}
            </Text>
          </Stack>
        </CardBody>
      </Link>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue'>
            Buy now
          </Button>
          <Button variant='ghost' colorScheme='blue' onClick={addToCart}>
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default ProductCard