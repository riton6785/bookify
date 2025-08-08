import { Box, Text } from '@chakra-ui/react'

const NotFound = () => {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={"100vh"}>
        <Text fontSize={"5xl"} fontWeight={"bold"}> Page Not Found </Text>
    </Box>
  )
}

export default NotFound