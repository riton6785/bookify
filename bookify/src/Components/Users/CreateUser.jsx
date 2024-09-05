import { Box, Button, HStack, Text, FormControl, Input, VStack, FormLabel, Select, useToast} from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const CreateUser = () => {
    const [name, setName] = useState();
    const [email, setEmail  ] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState("user");
    const [loading, setLoading] = useState(false);
    const [pic, setPic] = useState();
    const toast = useToast();
    const user = useSelector((state)=> state.userreducer.userInfo)

    const handleImage = (pic) => {
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
              console.log(pic)
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
    const createUser = async() => {
      setLoading(true)
      if ( !name || !email || !password || !pic || !role ) {
        toast({
          title: "fill all the details",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
        setLoading(false)
        return
      }
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          }
        }
        const { data } = await axios.post("http://localhost:2000/api/user/createuser", {
          name, email, password, pic, role
        }, config)
        setLoading(false)
        toast({
          title: "user created succesfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
      } catch (error) {
        setLoading(false)
        toast({
          title: error.response.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
      }
    }
  return (
    <>
        <Box borderBottomColor='gray.300' borderBottomWidth={2} m={7}>
            <HStack display='flex' justifyContent='space-between' m={2}>
                <Text fontWeight={500} fontSize={20}>
                    Create User
                </Text>
                <HStack>
                    <Button colorScheme='teal' borderRadius="20px" onClick={createUser} isLoading={loading}>Create</Button>
                </HStack>
            </HStack>
        </Box>
        <Box m={10} display="flex" flexDirection={{ base: "column ", md: "row" }}>
            <Box w="100%" m={3} display={{base:"", md: "flex"}} borderWidth={2} borderRadius={10}>
                <VStack spacing={3} p={10} m={3} w={{base:"100%", md: "45%"}}>
                    <Text fontWeight={500} fontSize={20}> Enter the information </Text>
                    <FormControl id="user-name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder='Enter the name' variant="filled" onChange={(e)=> setName(e.target.value)}/>
                    </FormControl>
                    <FormControl id="user-email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder='Enter the email address' variant="filled" onChange={(e)=> setEmail(e.target.value)}/>
                    </FormControl>
                    <FormControl id="user-password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input placeholder='Enter the password' variant="filled" onChange={(e)=> setPassword(e.target.value)}/>
                    </FormControl>
                </VStack>
                <VStack spacing={3} p={10} m={3} w={{base:"100%", md: "45%"}}>
                    <Text fontWeight={500} fontSize={20}>Additional Information</Text>
                    <FormControl id="user-image" isRequired>
                        <FormLabel>images</FormLabel>
                        <Input placeholder='Enter the pic' type='file' p={1.5} accept='image/*' variant="filled" onChange={(e) => handleImage(e.target.files[0])}/>
                    </FormControl>
                    <FormControl id="user-role" isRequired>
                        <FormLabel>Role</FormLabel>
                        <Select variant="filled" defaultValue='option1' onChange={(e)=> setRole(e.target.value)}>
                            <option value='user'>user</option>
                            <option value='admin'>admin</option>
                        </Select>
                    </FormControl>
                </VStack>
            </Box>
        </Box>
    </>
  )
}

export default CreateUser