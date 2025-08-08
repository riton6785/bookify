import { Box, Button, HStack, Text, FormControl, Input, VStack, FormLabel, Textarea, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter} from '@chakra-ui/react'
import Select from "react-dropdown-select";
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../config/config';

interface GenresForOption {
    value: string,
    label: string,
}
const AddProduct = () => {
    const [name, setName] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [pic, setPic] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [stock, setStock] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [publisher, setPublisher] = useState<string>();
    const [genres, setGenres] = useState<string>();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [fetchedGenres, setFetchedGenres] = useState<GenresBasics[]>();
    const [genreForBook, setGenreForBook] = useState<GenresForOption[] | undefined>();
    const user: User | null = useSelector((state: {userReducer: StateType})=> state.userReducer.user)
    
    const options: GenresForOption[] | [] = fetchedGenres?.map(genre=> ({
        value: genre._id,
        label: genre.name
    })) || []
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

    const createProduct = async(isPublished: boolean)=> {
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
                    Authorization: `Bearer ${user?.token}`
                }
            }
            const genres_ids = genreForBook?.map(genres => genres.value)
            await axios.post(`${BASE_URL}/book/addbook`, {
                name, price, author, description, stock, publisher, pic, isPublished, userId: user?._id, genres_ids
            }, config)
            setLoading(false)
        } catch {
            setLoading(false)
            toast({
                title: "Errro while adding book",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }

    const createGenres = async()=> {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`
            }
        }
        try {
            await axios.post(`${BASE_URL}/genres/creategenre`, {name: genres}, config)
        } catch {
            toast({
                title: "Error creating genres",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }
        onClose()
    }

    const fetchGenresHandler = async()=> {
        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        }
        try {
            const {data} = await axios.get(`${BASE_URL}/genres/getallgenres`, config)
            setFetchedGenres(data);
        } catch {
            toast({
                title: "Error while creating genres",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }
    useEffect(()=> {
        fetchGenresHandler();
    }, [])

  return (
    <>
        <Box borderBottomColor='gray.300' borderBottomWidth={2} m={7}>
            <HStack display='flex' justifyContent='space-between' m={2}>
                <Text fontWeight={500} fontSize={20}>
                    Add Product
                </Text>
                <HStack>
                    <Button colorScheme='teal' borderRadius="20px" onClick={onOpen}>CreateGenres</Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>Create genres</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl id='book-genre'>
                                <FormLabel>Genres</FormLabel>
                                <Input placeholder='Enter the Genres' variant="filled" onChange={(e)=> setGenres(e.target.value)}/>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='gray' borderRadius="20px" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button colorScheme='teal' borderRadius="20px" onClick={createGenres}>Create</Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Button colorScheme='gray' borderRadius="20px" onClick={()=> createProduct(false)} isLoading={loading}>Save to draft</Button>
                    <Button colorScheme='teal' borderRadius="20px" onClick={()=> createProduct(true)}>Publish</Button>
                </HStack>
            </HStack>
        </Box>
        <Box m={10} display="flex" flexDirection={{ base: "column", md: "row" }}>
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
                        <Input placeholder='Enter the Price' variant="filled" onChange={(e)=> setPrice(Number(e.target.value))}/>
                    </FormControl>
                    <FormControl id="book-image" isRequired>
                        <FormLabel>images</FormLabel>
                        <Input placeholder='Enter the pic' type='file' p={1.5} accept='image/*' variant="filled" onChange={(e) => {
                            const file = e.target?.files?.[0]; // safely access the first file
                            if (file) {
                            handleImage(file); // pass the file to handleImage function
                            }
                        }}/>
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
                        <Input placeholder='Enter the stock' variant="filled" onChange={(e)=> setStock(Number(e.target.value))}/>
                    </FormControl>
                    <FormControl id='book-description'>
                        <FormLabel>Description</FormLabel>
                        <Textarea placeholder='Enter the description' variant="filled" onChange={(e)=> setDescription(e.target.value)}/>
                    </FormControl>
                    <FormControl id='book-genres'>
                        <FormLabel>Genres</FormLabel>
                        <Select options={options} onChange={(values) => setGenreForBook(values)} multi={true} values={[]}
                            onSelect={() => {}} // Required by types may be we could use it in future.
                            onDeselect={() => {}} // Required by types may be we could use it in future.
                    />;
                    </FormControl>
                </VStack>
            </Box>
        </Box>
    </>
  )
}

export default AddProduct
