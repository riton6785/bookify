import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, ModalFooter, Tabs, TabList, Tab, TabPanels, TabPanel, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import Login from '../Authentication/Login'
import SIgnup from '../Authentication/SIgnup'

const AuthenticationModel = () => {
    const { isOpen, onOpen, onClose} = useDisclosure()
  return (
    <>
        <Button colorScheme='teal' variant='ghost' mr={3} onClick={onOpen}>Login/signup</Button>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box bg="white" w="100%" p={4}>
                <Tabs variant="soft-rounded">
                    <TabList mb="1em">
                        <Tab w="50%">Login</Tab>
                        <Tab w="50%">Signup</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login onClose={onClose}/>
                        </TabPanel>
                        <TabPanel>
                           <SIgnup onClose={onClose}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
          </Box>
          </ModalBody>
          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  )
}

export default AuthenticationModel