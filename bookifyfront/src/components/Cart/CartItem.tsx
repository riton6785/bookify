import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  toggleWishList,
} from "../../Redux/cartslice";
import { GiDuration } from "react-icons/gi";

const CartItem = ({ item }: { item: CartData }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const user: User | null = useSelector(
    (state: { userReducer: StateType }) => state.userReducer.user
  );
  const wishListItems = useSelector(
    (state: { cartReducer: CartState }) => state.cartReducer.wishlist
  );
  const increaseQuantity = async (): Promise<void> => {
    if (!user) {
      toast({
        title: "Please Login to add items to cart",
        status: "error",
        isClosable: true,
        position: "top",
      });
    } else {
      const prepareCartData: CartData = {
        product: item.product,
        quantity: 1,
      };
      dispatch(addToCart([prepareCartData]));
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      await axios.post(
        "http://localhost:2000/api/cart/addtocart",
        {
          bookId: item.product._id,
        },
        config
      );
    } catch (error) {
      toast({
        title: "Error while increasing quantity",
        status: "error",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
    }
  };

  const decreaseQuantity = async (quantity: number): Promise<void> => {
    if (!user) {
      toast({
        title: "Please Login to remove items from cart",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    }
    const prepareCartData: CartData = {
      product: item.product,
      quantity,
    };
    dispatch(removeFromCart(prepareCartData));

    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      await axios.post(
        "http://localhost:2000/api/cart/removeitem",
        {
          productId: item.product._id,
          quantity,
        },
        config
      );
    } catch (error) {
      toast({
        title: "Error removing item from cart",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    }
  };

  const addToWishlistFromCart = async (): Promise<void> => {
    decreaseQuantity(item.quantity);
    if (wishListItems.find((wishList) => wishList.id === item.product._id)) {
      toast({
        title: "Item already in wishList removed from cart",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    } else {
      dispatch(toggleWishList(item.product._id));

      try {
        const config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        };
        await axios.post(
          "http://localhost:2000/api/user/toggewishlist",
          { bookId: item.product._id },
          config
        );
        toast({
          title: "Item removed from cart and added to wishList",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
      } catch (error) {
        toast({
          title: "Error adding item to wishlist",
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
      }
    }
  };

  return (
    <VStack
      key={item.product._id}
      width="100%"
      padding="10px 20px"
      spacing={4}
      align="stretch"
      borderBottom="1px solid #eee"
    >
      <HStack justifyContent="space-between" align="flex-start" flexWrap="wrap">
        {/* Left: Image + Info */}
        <HStack spacing={4} flex="1" minW="300px">
          <Image
            src={item.product.pic}
            alt="Pic is loading"
            boxSize="100px"
            objectFit="cover"
            borderRadius="md"
          />
          <VStack align="flex-start" spacing={2}>
            <Text fontWeight="bold">{item.product.name}</Text>
            <Text fontSize="sm" color="gray.600">
              Warranty, issued to the purchaser of an article by its
              manufacturer, promising to repair or replace it if necessary
              within a specified period...
            </Text>
            <HStack spacing={4}>
              <Button
                size="sm"
                colorScheme="blue"
                variant="ghost"
                onClick={() => decreaseQuantity(item.quantity)}
              >
                Remove
              </Button>
              <Button
                size="sm"
                colorScheme="gray"
                variant="ghost"
                onClick={addToWishlistFromCart}
              >
                Save for Later
              </Button>
            </HStack>
          </VStack>
        </HStack>

        {/* Right: Price + Quantity */}
        <HStack spacing={6} align="center" mt={[4, 0]}>
          <Text fontWeight="bold" fontSize="lg">
            ${item.product.price}
          </Text>
          <HStack
            border="1px solid gray"
            borderRadius="md"
            padding="5px 10px"
            align="center"
          >
            <Button
              size="sm"
              variant="ghost"
              colorScheme="blue"
              onClick={() => decreaseQuantity(1)}
            >
              -
            </Button>
            <Text fontSize="md" px={2}>
              {item.quantity}
            </Text>
            <Button
              size="sm"
              variant="ghost"
              colorScheme="blue"
              onClick={increaseQuantity}
            >
              +
            </Button>
          </HStack>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default CartItem;
