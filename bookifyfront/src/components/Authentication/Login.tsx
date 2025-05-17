import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../Redux/slice'

const Login = ({onClose}: {onClose: ()=>void}) => {
    const [show, setShow] = useState<boolean>(false) 
    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const toast = useToast();
    const dispatch = useDispatch();

    const handleClick = () => setShow(!show)

    const submitHandler = async()=>{
        setLoading(true);
        try {
          const response = await axios.post("http://localhost:2000/api/user/login", {
            email, password
          })
          toast({
            title: "Logged in successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: 'bottom'
          })
          localStorage.setItem('user-info', JSON.stringify(response.data))
          dispatch(loginUser(response.data))
          setLoading(false);
        } catch (error) {
          toast({
            title: "error occured",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: 'bottom'
          })
          setLoading(false);
        }
        onClose();
      }
  return (
    <VStack spacing='5px'>
      <FormControl id='login-email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder='Enter your Email' onChange={(e)=> setEmail(e.target.value)}/>
      </FormControl>
      <FormControl id='login_password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input placeholder='Enter your PAssword' onChange={(e)=> setPassword(e.target.value)}/>
          <InputRightElement width="4rem">
          <Button height='100%'
            onClick={handleClick}>
              {show? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>

      </FormControl>
      <Button colorScheme='blue'
            width="100%"
            style={{marginTop: 15}}
            onClick={submitHandler} isLoading={loading}>Login</Button>
    </VStack>
  )
}

export default Login