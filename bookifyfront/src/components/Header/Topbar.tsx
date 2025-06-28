import { Box, Button, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Icon,
    Text,
    useToast,
    useBreakpointValue
   } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons"
import SideDrawer from './SideDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Redux/slice';
import Profile from './Profile';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { addToCart, toggleWishList } from '../../Redux/cartslice';
import axios from 'axios';
import AuthenticationModel from './AuthenticationModel';

const TopBar = () => {

    const dispatch = useDispatch();
    const toast = useToast();
    const [cartCount, setCartCount] = useState<number>(0)
    const cartItems = useSelector((state: {cartReducer: CartState}) => state.cartReducer.cart)
    const user: User | null = useSelector((state: {userReducer: StateType})=> state.userReducer.user);
    const navigate = useNavigate();
    const showBox = useBreakpointValue({base: false, lg: true})
    

    const getCartCount = () => {
        let count = 0;
        cartItems.forEach((item) => {
            count += item.quantity;
        });
        setCartCount(count);
    }

    const fetchCarts = async (): Promise<void> => {
    if (!user) {
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        }
      }
      const {data} = await axios.get("http://localhost:2000/api/cart/getcartitems", config);
      if (data) {
        dispatch(addToCart(data));
      }
    } catch(error) {
      toast({
        title: "Error fetching Cart",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
    }
  }

  const fetchWishList = async (): Promise<void> => {
      if (!user) {
        return;
      }
  
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`
          }
        }
        const {data} = await axios.get("http://localhost:2000/api/user/getwishlist", config);
        for (const itemId of data.wishListItems) {
          dispatch(toggleWishList(itemId))
        }
      } catch (error) {
        toast({
          title: "Error fetching WishList",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
        
      }
    }

  useEffect(() => {
    fetchCarts();
    fetchWishList();
  }, [])

    useEffect(()=> {
        getCartCount();
    },[cartItems])

    const logoutHandler = ()=>{
        dispatch(logoutUser());
        localStorage.removeItem('user-info');
        toast({
            title: "Logged out successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: 'bottom'
        })
    }

    const goToDashboard = ()=> {
      navigate("/dashboard")
    }
  return (
    <>
    <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="black"
        w="100%"
        px="10px"
        py="5px"
        >
        <Box flex="1">
          <SideDrawer />
        </Box>

          {/* Center Section */}
          <Box flex="1" textAlign="center" color="white" fontSize={20} fontWeight={500}>
            <Link to="/">Bookify</Link>
          </Box>
        <Box
            display="flex"
            alignItems="center"
            justifyContent="right"
            bg="black"
            px="10px"
            py="5px"
            flex="1"
        >
          <>
            {showBox && (
              <Box>
                {!user && <AuthenticationModel />}
                {user?.role === 'admin' && (
                  <Button variant="solid" colorScheme="teal" onClick={goToDashboard}>
                    Dashboard
                  </Button>
                )}
              </Box>
            )}
          </>
            <Link to="/mycart">
                <Box position="relative" background="white" mx={5} p={1}>
                <FaCartArrowDown size={24}/>

                {/* Badge Count */}
                    <Box
                        position="absolute"
                        top="-1"
                        right="-1"
                        background="red.500"
                        color="white"
                        borderRadius="full"
                        fontSize="xs"
                        w="18px"
                        h="18px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {cartCount}
                    </Box>
                </Box>
            </Link>
            <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="linkedin" margin={2} borderWidth={2}>
                Profile
            </MenuButton>
            <MenuList margin={2}>
                <Profile>
                <MenuItem>My profile</MenuItem>
                </Profile>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
            </Menu>
        </Box>
    </Box>

    </>
  )
}

export default TopBar