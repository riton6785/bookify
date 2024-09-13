import { Box, Icon, Text } from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'
import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
    const totalproduct = useSelector((state)=>state.userreducer.cart.length)
  return (
    <>
        <Box display="flex">
            <Icon as={FiShoppingCart}  w={8} h={8} color='blue.100' marginLeft={5}/>
            <Text  color='red.600' boxSize={6} fontSize="3xl" fontWeight="bold" marginTop="-20px" margin right={1}>{totalproduct}</Text>
        </Box>
    </>
  )
}

export default Cart