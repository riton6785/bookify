import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({book, addtocardhandler}) => {
    const navigate = useNavigate();
    const clickHandler = () => {
        navigate(`products/${book._id}`)
    }
  return (
    <>
        <Card maxW='sm' boxShadow='dark-lg' p='1' rounded='md' bg='white' onClick={()=> clickHandler(book)}>
            <CardBody>
                <Image borderWidth={5} borderBottom={5}
                src={book.pic}
                alt='fail to fetch image'
                borderRadius='lg'  w='100%' h="250px" objectFit="cover"
                />
                <Stack mt='6' spacing='3'>
                <Heading size='md'>{book.name}</Heading>
                <Text color='blue.600' fontSize='2xl'>
                    {book.price}
                </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='blue'>
                    Buy now
                </Button>
                <Button variant='ghost' colorScheme='blue' onClick={(event)=>addtocardhandler(book, event)}>
                    Add to cart
                </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    </>
  )
}

export default ProductCard