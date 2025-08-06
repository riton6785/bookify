import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Heading, Icon, useColorModeValue, VStack,Text, Divider } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
const bg = useColorModeValue('gray.50', 'gray.800');
  return (
    <Box
      bg={bg}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
        <Box
            maxW="lg"
            w="100%"
            p={8}
            borderRadius="lg"
            boxShadow="lg"
            bg={useColorModeValue('white', 'gray.700')}
            textAlign="center"
        >
            <VStack spacing={5}>
            <Icon as={CheckCircleIcon} boxSize={16} color="green.400" />
            <Heading size="lg">Payment Successful</Heading>
            <Text fontSize="md" color="gray.500">
                Thank you for your purchase! A confirmation email has been sent.
            </Text>

            <Divider />

            <Link to="/">
                Back to Home
            </Link>
            </VStack>
        </Box>
    </Box>
  )
}

export default PaymentSuccess
