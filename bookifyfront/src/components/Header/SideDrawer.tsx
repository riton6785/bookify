import React from 'react'
import {
    Button,
    Input,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import AuthenticationModel from './AuthenticationModel'

const SideDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const goToDashboard = ()=> {
            navigate("/dashboard")
            onClose()
    }
  return (
    <>
        <Button colorScheme='white' onClick={onOpen} >
            <HamburgerIcon boxSize={8}/>
            {/* Open */}
        </Button>
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody display="flex" flexDirection="column" alignItems="start">
                <AuthenticationModel/>
                <Button variant="ghost" colorScheme='teal' onClick={goToDashboard}>Dashboard</Button>
                <Button variant="ghost" colorScheme='teal'>My account</Button>

            </DrawerBody>

            <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
                </Button>
                <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default SideDrawer