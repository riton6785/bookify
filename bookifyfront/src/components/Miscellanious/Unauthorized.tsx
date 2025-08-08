import { Box, Text } from '@chakra-ui/react'

const Unauthorized = () => {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={"100vh"}>
        <Text fontSize={"5xl"} fontWeight={"bold"}> Unauthorized for this </Text>
    </Box>
  )
}

export default Unauthorized;