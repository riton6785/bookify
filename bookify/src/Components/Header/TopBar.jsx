import { Box, Button, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider
   } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons"
import React from 'react'
import AuthenticationModel from './AuthenticationModel';
import Profile from './Profile';

const TopBar = () => {
    const logoutHandler = ()=>{
        localStorage.removeItem('user-info');   
    }
  return (
    <>
        <Box
            display='flex'
            justifyContent='right'
            alignItems='center'
            bg='white'
            w='100%'
            p="5px, 10px, 5px, 10px"
            borderWidth='5px'
        >
            <AuthenticationModel/>
           <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme='linkedin'>
                    Profile
                </MenuButton>
                <MenuList>
                    <Profile>
                        <MenuItem>My profile</MenuItem>
                    </Profile>
                    <MenuDivider/>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </Box>
    </>
  )
}

export default TopBar