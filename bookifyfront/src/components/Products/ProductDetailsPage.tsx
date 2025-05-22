import {
  Box,
  Button,
  HStack,
  VStack,
  Image,
  Text,
  Heading,
  IconButton,
  Stack,
  Divider,
  useToast,
  Badge,
  Textarea,
} from "@chakra-ui/react";
import { FaHeart, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, removeFromCart, toggleWishList } from "../../Redux/cartslice";


const ProductDetailsPage = () => {
    const [book, setBook] = useState<Book>()
    const user: User | null = useSelector((state: {userReducer: StateType})=> state.userReducer.user);
    const params = useParams();
    const dispatch = useDispatch();
    const cartItems = useSelector((state: {cartReducer: CartState})=> state.cartReducer.cart)
    const isAddedToCart: boolean = (Boolean(cartItems.find((item: CartData) => item.product._id === book?._id)));
    const wishListItems = useSelector((state: {cartReducer: CartState})=> state.cartReducer.wishlist)
    const isAddedToWishList: boolean = Boolean(wishListItems.find((item) => item.id === book?._id));




const fetchBookById = async (id: string) => {
  try {
      const { data } = await axios.get("http://localhost:2000/api/book/bookbyid", {
        params: { id },
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      console.log("details", data)
      return data;
    } catch (error) {
      console.error("Failed to fetch book by ID:", error);
      throw error;
  }
};


    useEffect(() => {
    const getBook = async () => {
        const book = await fetchBookById( params.id );
        setBook(book);
    };
    getBook();
    }, []);
  const toast = useToast();

  const addToCartAction = async() => {
    if(!user  || !book) {
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
  }

  const removeFromCartAction = async() => {
    if (!user || !book) {
      toast({
        title: "Please Login to remove items from cart",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      })
    } else {
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
    
  }

  const handleWishlist = () => {
    toast({
      title: "Added to wishlist",
      status: "success",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Proceeding to checkout",
      status: "info",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };

  const toggleWishListAction = async(ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    if(!user || !book) {
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

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar color="gold" key={i} />);
      } else if (rating > i - 1 && rating < i) {
        stars.push(<FaStarHalfAlt color="gold" key={i} />);
      } else {
        stars.push(<FaRegStar color="gold" key={i} />);
      }
    }
    return <HStack>{stars}</HStack>;
  };

  const submitReview = ()=> {
    
  }

  return (
    <>{
      book ? (<Box maxW="7xl" mx="auto" p={6}>
      <Stack direction={{ base: "column", md: "row" }} spacing={10}>
        {/* Image */}
        <Box flex="1">
          <Image
            src={book.pic}
            alt={book.name}
            borderRadius="xl"
            objectFit="cover"
            w="100%"
            maxH="500px"
            boxShadow="lg"
          />
        </Box>

        {/* Details */}
        <VStack align="start" spacing={5} flex="1">
          <Heading size="2xl">{book.name}</Heading>
          <Text fontSize="xl" color="gray.600">
            by <strong>{book.author}</strong>
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">
            ₹ {book.price}
          </Text>
          <Badge colorScheme="purple">Published by: {book.publisher}</Badge>
          <Text color="gray.700" lineHeight="tall">
            {book.description}
          </Text>

          {/* Static Rating & Reviews */}
          <Box>
            {renderStars(4.2)}
            <Text fontSize="sm" color="gray.500">
              13 customer reviews
            </Text>
          </Box>

          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={isAddedToCart ? removeFromCartAction: addToCartAction}>
              {isAddedToCart? "Remove from CArt": "Add to Cart"}
            </Button>
            <IconButton
              icon={<FaHeart />}
              aria-label="Add to Wishlist"
              colorScheme={isAddedToWishList? "red": "blue"}
              variant="outline"
              onClick={toggleWishListAction}
            />
            <Button colorScheme="green" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </HStack>
        </VStack>
      </Stack>

      <Divider my={10} />

      {/* Static Reviews Placeholder */}
      <Stack direction={{base: "column", md: "row"}} mt={6} gap={10}>
        <Box flex={'1 1 60%'}>
          <Heading size="md" mb={4}>
            Add your Reviews
          </Heading>
          <VStack spacing={4} align="stretch">
            <Textarea
              border="3px solid #eee"
              borderRadius="md"
              padding="20px"
              boxShadow="md"
            />
            <Button colorScheme="blue" variant="solid" onClick={submitReview}>
              Submit Review
            </Button>
          </VStack>
        </Box>
        <Box flex={'1 1 50%'}>
          <Heading size="md" mb={4}>
            Customer Reviews
          </Heading>
          <Text color="gray.500">
            ★★★★★ "Great book, loved the writing style and flow!"
          </Text>
          <Text color="gray.500">
            ★★★★☆ "Informative and well-structured. A must-read."
          </Text>
        </Box>

      </Stack>
    </Box>)
    :<Box>Loading</Box>
    }
    </>
      
  );
};

export default ProductDetailsPage;
