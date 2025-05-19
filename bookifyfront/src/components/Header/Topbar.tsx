import { Box, Button, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Icon,
    Text,
    useToast
   } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons"
import SideDrawer from './SideDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Redux/slice';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { useEffect, useState } from 'react';

const TopBar = () => {

    const dispatch = useDispatch();
    const toast = useToast();
    const [cartCount, setCartCount] = useState<number>(0)
    const cartItems = useSelector((state: {cartReducer: CartState}) => state.cartReducer.cart)

    const getCartCount = () => {
        let count = 0;
        cartItems.forEach((item) => {
            count += item.quantity;
        });
        setCartCount(count);
    }

    useEffect(()=> {
        getCartCount();
    },)

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
        <SideDrawer />
        <Box color="white" fontSize={20} fontWeight={500} margin={2}>
            <Link to="/">Bookify</Link>
        </Box>
        <Box
            display="flex"
            alignItems="center"
            bg="black"
            px="10px"
            py="5px"
        >
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