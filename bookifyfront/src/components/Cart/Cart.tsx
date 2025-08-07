import { Box, Button, Flex, HStack, Input, Text, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config/config';

const Cart = () => {
    const cartItems = useSelector((state: {cartReducer: CartState})=> state.cartReducer.cart);
    const totalBill = cartItems.map((item)=> item.product.price * item.quantity).reduce((acc: number, current: number) => acc + current, 0);
    const user: User | null = useSelector((state: {userReducer: StateType}) => state.userReducer.user);
    const toast = useToast();
    const navigate = useNavigate();
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
    const proceedCheckout = async() => {
        const productAndQuantities = cartItems.map(item => ({
            product_id: item.product._id,
            quantity: item.quantity
        }));
        try {
            const {data: orderData} = await axios.post(`${BASE_URL}/payment/process/payment`,{amount: totalBill, productAndQuantities}, config) 
            const {data: keyData} = await axios.get(`${BASE_URL}/payment/razorpaykey`, config);
            const {orders} = orderData;
            const options = {
                key: keyData.key, // Replace with your Razorpay key_id
                amount: totalBill, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: 'INR',
                name: 'Bookify ',
                description: 'One stop shop for all your book needs',
                order_id: orders.id, // This is the order_id created in the backend
                callback_url: `${BASE_URL}/payment/payment_verification?userId=${user?._id}`, // Your success URL
                prefill: {
                name: user?.name,
                email: user?.email,
                contact: '9999999999'
                },
                theme: {
                color: '#F37254'
                },
            };

            const rzp = new Razorpay(options);
            rzp.open();
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong while processing your payment.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    const continueShopingHandler = ()=> {
        navigate("/");
    }
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
                    <Button colorScheme='blue' variant='solid' gap={2} onClick={proceedCheckout}>Checkout <FaChevronCircleRight/></Button>
                    <Flex align="center" width="100%">
                        <Box flex="1" borderBottom="1px solid #ccc" />
                        <Text px="4" whiteSpace="nowrap" fontWeight="medium" color="gray.500">
                            Or
                        </Text>
                        <Box flex="1" borderBottom="1px solid #ccc" />
                    </Flex>
                    <Button colorScheme='blue' variant='solid' gap={2} onClick={continueShopingHandler}><FaChevronCircleLeft/> Continue Shopping</Button>
                </VStack>
            </Box>
        </Box>
    </>
  )
}

export default Cart