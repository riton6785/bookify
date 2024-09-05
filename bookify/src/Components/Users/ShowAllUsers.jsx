import { Avatar, Box, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ShowAllUsers = () => {
  const [users, setUsers] = useState();
  const toast = useToast();
  const user = useSelector((state)=> state.userreducer.userInfo);

  const fetchUsers = async()=> {
    try {
      console.log("usereeeeeeeeeeee", user)
      const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
        }
      }
      const {data} = await axios.get("http://localhost:2000/api/user/getallusers", config)
      setUsers(data)
    } catch (error) {
      toast({
        title: error.response.data,
        status: "error",
        isClosable: true,
        duration: 5000,
        position: 'bottom'
      })
      
    }
  }
  useEffect(()=> {
    console.log("Hello")
    fetchUsers();
}, [])
  return (
    <div>
      <Box bg='black'>
              {
                  users ? users.map((user, index)=> (
                      <Box p={4} color='white' display="flex" key={user._id} letterSpacing={2} borderBottomWidth='1px' borderColor="white" marginY={1} cursor='pointer'>
                          <Box width="20%">{user.name}</Box>
                          <Box  width="20%">{user.email}</Box>
                          <Box  width="20%">{user.price}</Box>
                          <Box  width="20%">{user.role}</Box>
                          <Avatar name="book avatarr" src={user.pic}/>
                      </Box>
                  )) : <Box>loading</Box>}
      </Box>
    </div>
  )
}

export default ShowAllUsers