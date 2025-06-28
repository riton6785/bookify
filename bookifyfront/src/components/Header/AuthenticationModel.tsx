import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import Login from '../Authentication/Login';
import SIgnup from '../Authentication/SignUp';

const AuthenticationModel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authType, setAuthType] = useState<'login' | 'signup' | ''>('');

  const setAuthTypeHandler = (auth: 'login' | 'signup') => {
    setAuthType(auth);
    onOpen();
  };

  const renderAuthContent = () => {
    if (authType === 'login') return <Login onClose={onClose} />;
    return <SIgnup onClose={onClose} />;
  };

  return (
    <>
      <HStack spacing={4} justify="center" my={4}>
        <Button
          onClick={() => setAuthTypeHandler('login')}
          colorScheme="teal"
          variant="solid"
          px={6}
          py={2}
        >
          Login
        </Button>
        <Button
          onClick={() => setAuthTypeHandler('signup')}
          colorScheme="blue"
          variant="outline"
          px={6}
          py={2}
        >
          Signup
        </Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {authType === 'login' ? 'Login to Your Account' : 'Create a New Account'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box bg="white" w="100%" p={4}>
              {renderAuthContent()}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthenticationModel;
