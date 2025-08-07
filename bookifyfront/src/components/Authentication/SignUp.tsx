import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginUser } from '../../Redux/slice';
import { BASE_URL } from '../../config/config';
const SIgnup = ({onClose}: {onClose: () => void;}) => {
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmpassword] = useState<string>("");
  const [otp, setOtp] = useState<string>(0);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const dispatch = useDispatch();

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
          setProfilePic(data.url.toString())
          setLoading(false)
        })
        .catch((error)=> {
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

  const submitHandler = async()=> {
      setLoading(true)
      if( !name || !email || !password || !confirmpassword || !profilePic || !otp) {
        toast({
          title: "please fill all the fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",    
        });
        return
      }
      if( password !== confirmpassword ) {
        toast({
          title: "Password and confirm password should be same",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",        
        });
        return
      }
     try {
      const response = await axios.post(`${BASE_URL}/user/register`, {
        name, email, password, profilePic, otp,
      });
      toast({
        title: "Account created succesfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      localStorage.setItem('user-info', JSON.stringify(response.data))
      dispatch(loginUser(response.data))
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

  const generateOtp = async()=> {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const {data} = await axios.post(
        `${BASE_URL}/otp/sendotp`,
        {
          email: email,
        },
        config
      );
      console.log("Dataaaaaaaaaaaaaa", data);
      
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
        <InputGroup>
          <Input placeholder='Enter your Email' onChange={(e)=> setEmail(e.target.value)}/>
          <InputRightElement width="4rem">
            <Button height='100%'
            onClick={generateOtp}>
              Get OTP
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="otp" isRequired>
        <FormLabel>OTP</FormLabel>
        <Input placeholder='Enter your otp' onChange={(e)=> setOtp(e.target.value)}/>
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