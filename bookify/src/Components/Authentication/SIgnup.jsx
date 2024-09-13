import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import  axios  from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../Redux/slicer'

const SIgnup = ({onClose}) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch()

  const handleClick = () => setShow(!show);

  const handleImage = (pic)=> {
    setLoading(true);
    if ( pic === undefined) {
      toast({
        title: "please select a image",
        status: "warning",
        duration: 5000,
        inClosable: true,
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
        inClosable: true,
        position: "bottom",        
      });
      return
    }
  }
  const submitHandler = async()=> {
    setLoading(true)
    if( !name || !email || !password || !confirmpassword || !pic) {
      toast({
        title: "please fill all the fields",
        status: "warning",
        duration: 5000,
        inClosable: true,
        position: "bottom",    
      });
      return
    }
    if( password !== confirmpassword ) {
      toast({
        title: "Password and confirm password should be same",
        status: "warning",
        duration: 5000,
        inClosable: true,
        position: "bottom",        
      });
      return
    }
   try {
    const response = await axios.post("http://localhost:2000/api/user/register", {
      name, email, password, pic,
    });
    console.log(response)
    toast({
      title: "Account created succesfully",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: 'bottom'
    })
    localStorage.setItem('user-info', JSON.stringify(response.data))
    dispatch(setUser(response.data));
    setLoading(false);
    onClose()
   } catch (error) {
    toast({
      title: "error occured",
      description: error.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: 'bottom'
    })

   }
  }
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder='Enter your name' onChange={(e)=> setName(e.target.value)}/>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder='Enter your Email' onChange={(e)=> setEmail(e.target.value)}/>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={show ? "text": "password"} placeholder='Enter your password' onChange={(e)=> setPassword(e.target.value)}/>
          <InputRightElement width="4rem">
            <Button height='100%'
            onClick={handleClick}>
              {show? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>

      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input type={show ? "text": "password"} placeholder='Enter your password' onChange={(e)=> setConfirmpassword(e.target.value)}/>
          <InputRightElement width="4rem">
            <Button height='100%'
            onClick={handleClick}>
              {show? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='pic' isRequired>
        <FormLabel>Upload your glamorus pic</FormLabel>
        <Input type='file' p={1.5} accept='image/*' onChange={(e)=> handleImage(e.target.files[0])}/>
      </FormControl>
      <Button
          colorScheme='blue'
          width="100%"
          style={{marginTop: 15}}
          onClick={submitHandler}
          isLoading={loading}
        >
          Sign Up
        </Button>
    </VStack>
  )
}

export default SIgnup