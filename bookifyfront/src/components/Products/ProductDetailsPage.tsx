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
  Icon,
} from "@chakra-ui/react";
import { FaHeart, FaStar } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, removeFromCart, toggleWishList } from "../../Redux/cartslice";
import { addReview } from "../../Redux/review_slice";
import RenderReviews from "./RenderReviews";
import StarRendering from "./StarRendering";
import { BASE_URL } from "../../config/config";


const ProductDetailsPage = () => {
    const [book, setBook] = useState<Book>()
    const [description, setDescription] = useState<string>()
    const [rating, setRating] = useState<number>(0);
    const user: User | null = useSelector((state: {userReducer: StateType})=> state.userReducer.user);
    const params = useParams();
    const dispatch = useDispatch();
    const cartItems = useSelector((state: {cartReducer: CartState})=> state.cartReducer.cart)
    const isAddedToCart: boolean = (Boolean(cartItems.find((item: CartData) => item.product._id === book?._id)));
    const wishListItems: Wishlist[] = useSelector((state: {cartReducer: CartState})=> state.cartReducer.wishlist)
    const isAddedToWishList: boolean = Boolean(wishListItems.find((item) => item.id === book?._id));
    const allReviews: ReviewData[] = useSelector((state: {reviewReducer: ReviewState}) => state.reviewReducer.reviews)
    const totalReviews: number = useSelector((state: {reviewReducer: ReviewState})=> state.reviewReducer.reviews.length)
    const averageReview: number = useSelector((state: {reviewReducer: ReviewState})=> state.reviewReducer.reviews.reduce((sum, curr)=> sum + curr.rating, 0) / totalReviews)
    const fetchBookById = async (id: string) => {
      try {
          const { data } = await axios.get(`${BASE_URL}/book/bookbyid`, {
            params: { id },
            headers: {
              Authorization: `Bearer ${user?.token}`
            }
          });
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
        await axios.post(`${BASE_URL}/cart/addtocart`, {
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
        await axios.post(`${BASE_URL}/cart/removeitem`, {
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
        await axios.post(`${BASE_URL}/user/toggewishlist`,{bookId: book._id}, config)
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

  const submitReview = async(): Promise<void>=> {
    if(!user || !book) {
      toast({
        title: "Something went wrong",
        status: "error",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      })
    } else {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`          }
          }
          
          const {data} = await axios.post(`${BASE_URL}/review/postreview`, {review: description, bookId: book._id, rating}, config);
          dispatch(addReview([data]))
          setDescription("")
        toast({
          title: "Review posted succesfully",
          status: "success",
          position: "top",
          isClosable: true,
          duration: 5000,
        })
      } catch (error) {
        toast({
          title: "Error occured while posting the review",
          status: "error",
          isClosable: true,
          position: "bottom",
          duration: 5000,
          description: error.response.data.message
        }) 
      }
    }
  }

  const fetchReviews = async(id: string): Promise<void> => {
    if (!user) {
      toast({
        title: "NO user or book found",
        status: "error",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      })
    } else {
       const { data } = await axios.get(`${BASE_URL}/review/getreviewofbook`, {
            params: { bookId: id },
            headers: {
              Authorization: `Bearer ${user?.token}`
            }
          });
          dispatch(addReview(data.reviews))
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
      product_id: book?._id,
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
        `${BASE_URL}/payment/process/payment`,
        { amount: book?.price, productAndQuantities },
        config
      );
      const { data: keyData } = await axios.get(
        `${BASE_URL}/payment/razorpaykey`,
        config
      );
      const {orders} = orderData;
      const options = {
        key: keyData.key, // Replace with your Razorpay key_id
        amount: book?.price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Bookify ",
        description: "One stop shop for all your book needs",
        order_id: orders.id, // This is the order_id created in the backend
        callback_url: `${BASE_URL}/payment/payment_verification?userId=${user?._id}`, // Your success URL
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

  useEffect(()=> {
    fetchReviews(params.id);
  }, [])

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
            <StarRendering rating={averageReview}/>
            <Text fontSize="sm" color="gray.500">
              {totalReviews} customer reviews
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
            <Button colorScheme="green" onClick={proceedCheckout}>
              Buy Now
            </Button>
          </HStack>
        </VStack>
      </Stack>

      <Divider my={10} />

      {/* Static Reviews Placeholder */}
      <Box display={"flex"} flexWrap={"wrap"} mt={6} gap={10}>
        <Box flex={'1 1 30%'} position={"sticky"} top={"50px"}>
          <Heading size="md" mb={4}>
            Add your Reviews
          </Heading>
          <VStack spacing={4} align="stretch">
            <HStack>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  as={FaStar}
                  boxSize={6}
                  cursor="pointer"
                  color={star <= rating ? "yellow.400" : "gray.300"}
                  onClick={() => setRating(star)}
                />
              ))}
            </HStack>
            <Textarea
              value={description}
              border="3px solid #eee"
              borderRadius="md"
              padding="20px"
              boxShadow="md"
              onChange={(e)=> setDescription(e.target.value)}
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
          <VStack align={"stretch"} overflowY={"auto"} maxH={"80vh"}>
              {
              allReviews.length > 0 ? allReviews.map((review)=> (
                <RenderReviews review={review}/>
              )): <Text>No reviews available</Text>
            }
          </VStack>
        </Box>

      </Box>
    </Box>)
    :<Box>Loading</Box>
    }
    </>
      
  );
};

export default ProductDetailsPage;
