import { Box, Button, HStack, Text, FormControl, Input, VStack, FormLabel, Textarea, useToast} from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';

const AddProduct = () => {
    const [name, setName] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [pic, setPic] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [stock, setStock] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [publisher, setPublisher] = useState<string>();
    const toast = useToast();
    const user: User | null = useSelector((state: {userReducer: StateType})=> state.userReducer.user)

    const handleImage = (pic: File)=> {
        setLoading(true);
        if ( pic === undefined) {
          toast({
            title: "please select a image",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",        
          });
          return
        }
        if ( pic.type === "image/jpeg" || pic.type === "image/png") {
          const data = new FormData();
          data.append("file", pic);
          data.append("upload_preset", "chat-app");
          data.append("cloud_name", "dcjknvxf1");
    
          fetch("https://api.cloudinary.com/v1_1/dcjknvxf1/image/upload", {
            method: "post",
            body: data,
          }).then((res)=>res.json())
            .then((data)=> {
              setPic(data.url.toString())
              setLoading(false)
            })
            .catch((error)=> {
              console.log(error)
              setLoading(false)
            })
           
        } else {
          toast({
            title: "please select a image",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",        
          });
          return
        }
    }

    const createProduct = async(ispublished: boolean)=> {
        setLoading(true)
        if( !name || !author || !price || !pic || !stock || !publisher || !description) {
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false)
            return
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.post("http://localhost:2000/api/book/addbook", {
                name, price, author, description, stock, publisher, pic, ispublished
            }, config)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast({
                title: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }

  return (
    <>
        <Box borderBottomColor='gray.300' borderBottomWidth={2} m={7}>
            <HStack display='flex' justifyContent='space-between' m={2}>
                <Text fontWeight={500} fontSize={20}>
                    Add Product
                </Text>
                <HStack>
                    <Button colorScheme='gray' borderRadius="20px" onClick={()=> createProduct(false)} isLoading={loading}>Save to draft</Button>
                    <Button colorScheme='teal' borderRadius="20px" onClick={()=> createProduct(true)}>Publish</Button>
                </HStack>
            </HStack>
        </Box>
        <Box m={10} display="flex" flexDirection={{ base: "column ", md: "row" }}>
            <Box w="100%" m={3} display={{base:"", md: "flex"}} borderWidth={2} borderRadius={10}>
                <VStack spacing={3} p={10} m={3} w={{base:"100%", md: "45%"}}>
                    <Text fontWeight={500} fontSize={20}> Enter the information </Text>
                    <FormControl id="book-name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder='Enter the name' variant="filled" onChange={(e)=> setName(e.target.value)}/>
                    </FormControl>
                    <FormControl id="author-name" isRequired>
                        <FormLabel>Author Name</FormLabel>
                        <Input placeholder='Enter the Author name' variant="filled" onChange={(e) => setAuthor(e.target.value)}/>
                    </FormControl>
                    <FormControl id="book-price" isRequired>
                        <FormLabel>Price</FormLabel>
                        <Input placeholder='Enter the Price' variant="filled" onChange={(e)=> setPrice(e.target.value)}/>
                    </FormControl>
                    <FormControl id="book-image" isRequired>
                        <FormLabel>images</FormLabel>
                        <Input placeholder='Enter the pic' type='file' p={1.5} accept='image/*' variant="filled" onChange={(e)=> handleImage(e.target.files[0])}/>
                    </FormControl>
                </VStack>
                <VStack spacing={3} p={10} m={3} w={{base:"100%", md: "45%"}}>
                    <Text fontWeight={500} fontSize={20}>Additional Information</Text>
                    <FormControl id="book-publisher" isRequired>
                        <FormLabel>Publisher</FormLabel>
                        <Input placeholder='Enter the Publisher' variant="filled" onChange={(e)=> setPublisher(e.target.value)}/>
                    </FormControl>
                    <FormControl id='book-stock'>
                        <FormLabel>Stock</FormLabel>
                        <Input placeholder='Enter the stock' variant="filled" onChange={(e)=> setStock(e.target.value)}/>
                    </FormControl>
                    <FormControl id='book-description'>
                        <FormLabel>Description</FormLabel>
                        <Textarea placeholder='Enter the description' variant="filled" onChange={(e)=> setDescription(e.target.value)}/>
                    </FormControl>
                </VStack>
            </Box>
        </Box>
    </>
  )
}

export default AddProduct
