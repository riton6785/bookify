import { Box, Button, Flex, HStack, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const Cart = () => {
    const cartItems = useSelector((state: {cartReducer: CartState})=> state.cartReducer.cart);
    const totalBill = cartItems.map((item)=> item.product.price * item.quantity).reduce((acc: number, current: number) => acc + current, 0);
  return (
    <>
        <Box display={"flex"} alignItems={"flex-start"} justifyContent={"space-between"} width={"100%"} padding={"10px 20px"} flexWrap={"wrap"}>
            <Box flex="1 1 65%" minW="300px">
                {
                    cartItems.map((item) => (
                        <CartItem key={item.product._id} item={item}/>
                    ))
                }
            </Box>
            <Box 
                flex="1 1 30%"
                minW="250px"
                border="3px solid #eee"
                borderRadius="md"
                padding="20px"
                boxShadow="md" position={"sticky"} top="50px">
                <VStack align={"stretch"} spacing={4}>
                    <HStack justifyContent="space-between">
                        <Text>Subtotal</Text>
                        <Text>{totalBill}</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                        <Text>Taxes</Text>
                        <Text>{totalBill*0.2}</Text>
                    </HStack>
                    <HStack justifyContent="space-between" fontWeight="bold" pt={2} borderTop="1px solid #ccc">
                        <Text>Total</Text>
                        <Text>${(totalBill * 1.2).toFixed(2)}</Text>
                    </HStack>
                    <HStack gap={2} mt={5}>
                        <Input placeholder='Enter your coupon code'/>
                        <Button colorScheme="blue" variant="solid">Apply</Button>
                    </HStack>
                    <Button colorScheme='blue' variant='solid' gap={2}>Checkout <FaChevronCircleRight/></Button>
                    <Flex align="center" width="100%">
                        <Box flex="1" borderBottom="1px solid #ccc" />
                        <Text px="4" whiteSpace="nowrap" fontWeight="medium" color="gray.500">
                            Or
                        </Text>
                        <Box flex="1" borderBottom="1px solid #ccc" />
                    </Flex>
                    <Button colorScheme='blue' variant='solid' gap={2}><FaChevronCircleLeft/> Continue Shopping</Button>
                </VStack>
            </Box>
        </Box>
    </>
  )
}

export default Cart