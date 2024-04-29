import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image, ModalFooter, Text, Button } from '@chakra-ui/react';
import React from 'react'

const Profile = ({children}) => {
    const user = JSON.parse(localStorage.getItem("user-info"));
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <>
            {
                !user ? (
                    <span>{children}</span>
                ) : (
                    <>
                    <span onClick={onOpen}>{children}</span>
                    <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay/>
            <ModalContent h="400px">
                <ModalHeader
                    fontSize="40px"
                    fontFamily="Work sans"
                    display="flex"
                    justifyContent="center"
                >{user.name}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Image
                        borderRadius="full"
                        boxSize="150px"
                        src={user.pic}
                        alt={user.name}
                    />
                    <Text fontSize={{base: "28px", md: "30px"}} fontFamily="Work sans">
                        Email: {user.email}
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
                    <Button variant="ghost">Account</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
                    </>
                )
            }
            
        </>
    )
}

export default Profile