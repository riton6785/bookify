import { Box, Button, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Icon,
    Text
   } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons"
import React from 'react'
import AuthenticationModel from './AuthenticationModel';
import Profile from './Profile';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/slicer';
import { FiShoppingCart   } from 'react-icons/fi'
import Cart from '../Cart/Cart';

const TopBar = () => {
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        localStorage.removeItem('user-info');
        dispatch(setUser(null));
    }
  return (
    <>
        <Box
            display='flex'
            justifyContent='right'
            alignItems='center'
            bg='black'
            w='100%'
            p="5px, 10px, 5px, 10px"
        >
            <AuthenticationModel/>
           <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme='linkedin' margin={2} borderWidth={2}>
                    Profile
                </MenuButton>
                <MenuList margin={2}>
                    <Profile>
                        <MenuItem>My profile</MenuItem>
                    </Profile>
                    <MenuDivider/>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu>
            <Cart/>
        </Box>
    </>
  )
}

export default TopBar