import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, HStack, IconButton, Image, position, Stack, Text, useToast } from "@chakra-ui/react"
import { FaHeart } from 'react-icons/fa';

import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addToCart, toggleWishList, removeFromCart } from '../../Redux/cartslice'
import axios from "axios";

const ProductCard = ({book, key}: {book: Book, key: number}) => {
  const user: User | null = useSelector((state: {userReducer: StateType})=> state.userReducer.user)
  const dispatch = useDispatch();
  const cartItems = useSelector((state: {cartReducer: CartState})=> state.cartReducer.cart);
  const wishListItems = useSelector((state: {cartReducer: CartState})=> state.cartReducer.wishlist);
  const isAddedToCart: boolean = (Boolean(cartItems.find((item: CartData) => item.product._id === book._id)));
  const isAddedToWishList: boolean = Boolean(wishListItems.find((item) => item.id === book._id));
  const toast = useToast();

  const addToCartAction = async() => {
    if(!user) {
      toast({
        title: "Please Login to add items to cart",
        status: "error",
        isClosable: true,
        position: "top"
      })
    } else {
      const prepareCartData: CartData = {
        product: {
          _id: book._id,
          name: book.name,
          pic: book.pic,
          price: book.price
        },
        quantity: 1
      }
      dispatch(addToCart([prepareCartData]))
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        }
      }
      await axios.post("http://localhost:2000/api/cart/addtocart", {
        bookId: book._id
      }, config)
      toast({
          title: "Item added to cart",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        })
    } catch (error) {
      toast({
        title: "Error adding item to cart",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      })
    }
  }

  const removeFromCartAction = async() => {
    if (!user) {
      toast({
        title: "Please Login to remove items from cart",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      })
    }
    const quantity = cartItems.find((item: CartData)=> item.product._id === book._id)?.quantity
    const prepareCartData: CartData = {
      product: {
        _id: book._id,
        name: book.name,
        pic: book.pic,
        price: book.price
      },
      quantity: quantity ? quantity: 0
    }
    dispatch(removeFromCart(prepareCartData));

    try {
      const config = {
        headers:{
          'content-type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        }
      }
      await axios.post("http://localhost:2000/api/cart/removeitem", {
        productId: book._id,
        quantity
      }, config)
      toast({
          title: "Item removed from cart",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        })
    } catch (error) {
      toast({
        title: "Error removing item from cart",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      })
      
    }
  }

  const toggleWishListAction = async(ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    if(!user) {
      toast({
        title: "Please Login to add items to cart",
        status: "error",
        isClosable: true,
        position: "top"
      })
    } else {
      dispatch(toggleWishList(book._id))

      try {
        const config = {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${user?.token}`
          }
        }
        await axios.post("http://localhost:2000/api/user/toggewishlist",{bookId: book._id}, config)
        toast({
          title: "Wishlist toggled successfully",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        })
      } catch (error) {
        toast({
          title: "Error adding item to wishlist",
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        })
        
      }
    }
  }

  const proceedCheckout = async(): Promise<void | string | number> => {
    if(!user) {
      return toast({
        title: "Please Login to add items to cart",
        status: "error",
        isClosable: true,
        position: "top"
      })
    }
    const productAndQuantities = [{
      product_id: book._id,
      quantity: 1
    }]
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${user?.token}`
      }
    }
    try {
      const { data: orderData } = await axios.post(
        "http://localhost:2000/api/payment/process/payment",
        { amount: book.price, productAndQuantities },
        config
      );
      const { data: keyData } = await axios.get(
        "http://localhost:2000/api/payment/razorpaykey",
        config
      );
      const {orders} = orderData;
      const options = {
        key: keyData.key, // Replace with your Razorpay key_id
        amount: book.price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Bookify ",
        description: "One stop shop for all your book needs",
        order_id: orders.id, // This is the order_id created in the backend
        callback_url: `http://localhost:2000/api/payment/payment_verification?userId=${user?._id}`, // Your success URL
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
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
  return (
    <Card maxW='sm' key={key} alignItems={"center"} justifyContent={"center"}>
      <Link to={`/book/${book._id}`}>
        <CardBody>
          <Box position="absolute" top={2} right={2} zIndex={1}>
            <IconButton
              icon={<FaHeart />}
              variant="ghost"
              colorScheme={isAddedToWishList ? "red": "blue"}
              aria-label="Add to wishlist"
              size="lg"
              onClick={(e)=> toggleWishListAction(e)} // define this function
            />
          </Box>
          <Image
            src={book.pic}
            alt='Green double couch with wooden legs'
            borderRadius='lg'
            width={"100%"}
            height={"200px"}
            objectFit="cover"
            mx="auto"
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{book.name}</Heading>
            <Text color='blue.600' fontSize='2xl'>
              {book.price}
            </Text>
            <Text color='blue.600' fontSize='2xl'>
              {book.publisher}
            </Text>
            <Text noOfLines={2}>
              {book.description}
            </Text>
          </Stack>
        </CardBody>
      </Link>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue' onClick={proceedCheckout}>
            Buy now
          </Button>
          <Button variant='ghost' colorScheme='blue' onClick={isAddedToCart? removeFromCartAction: addToCartAction}>
            {isAddedToCart ? "Remove from cart": "Add to cart"}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default ProductCard