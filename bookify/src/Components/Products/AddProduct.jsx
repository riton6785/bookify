import { Box, Button, HStack, Text, FormControl, Input, VStack, FormLabel, Textarea} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

const AddProduct = () => {
    const [name, setName] = useState();
    const [authorName, setAuthorName] = useState();
    const [price, setPrice] = useState();

  return (
    <>
        <Box borderBottomColor='gray.300' borderBottomWidth={2} m={7}>
            <HStack display='flex' justifyContent='space-between' m={2}>
                <Text fontWeight={500} fontSize={20}>
                    Add Product
                </Text>
                <HStack>
                    <Button colorScheme='gray' borderRadius="20px">Save to draft</Button>
                    <Button colorScheme='teal' borderRadius="20px">Publish</Button>
                </HStack>
            </HStack>
        </Box>
        <Box m={10} display="flex" flexDirection={{ base: "column ", md: "row" }}>
            <Box w="100%" m={3} display={{base:"", md: "flex"}} borderWidth={2} borderRadius={10}>
                <VStack spacing={3} p={10} m={3} w={{base:"100%", md: "45%"}}>
                    <Text fontWeight={500} fontSize={20}> Enter the information </Text>
                    <FormControl id="book-name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder='Enter the name' variant="filled"/>
                    </FormControl>
                    <FormControl id="author-name" isRequired>
                        <FormLabel>Author Name</FormLabel>
                        <Input placeholder='Enter the Author name' variant="filled"/>
                    </FormControl>
                    <FormControl id="book-price" isRequired>
                        <FormLabel>Price</FormLabel>
                        <Input placeholder='Enter the Price' variant="filled"/>
                    </FormControl>
                    <FormControl id="book-image" isRequired>
                        <FormLabel>images</FormLabel>
                        <Input placeholder='Enter the pic' type='file' p={1.5} accept='image/*' variant="filled"/>
                    </FormControl>
                </VStack>
                <VStack spacing={3} p={10} m={3} w={{base:"100%", md: "45%"}}>
                    <Text fontWeight={500} fontSize={20}>Additional Information</Text>
                    <FormControl id='book-description'>
                        <FormLabel>Description</FormLabel>
                        <Textarea placeholder='Enter the description' variant="filled"/>
                    </FormControl>
                    <FormControl id='book-stock'>
                        <FormLabel>Stock</FormLabel>
                        <Input placeholder='Enter the stock' variant="filled"/>
                    </FormControl>
                </VStack>
            </Box>
        </Box>
    </>
  )
}

export default AddProduct