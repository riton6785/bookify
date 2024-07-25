import { Box, Button, HStack, Text, FormControl, Input, VStack, FormLabel, Select} from '@chakra-ui/react'
import React from 'react'

const CreateUser = () => {
  return (
    <>
        <Box borderBottomColor='gray.300' borderBottomWidth={2} m={7}>
            <HStack display='flex' justifyContent='space-between' m={2}>
                <Text fontWeight={500} fontSize={20}>
                    Create User
                </Text>
                <HStack>
                    <Button colorScheme='teal' borderRadius="20px">Create</Button>
                </HStack>
            </HStack>
        </Box>
        <Box m={10} display="flex" flexDirection={{ base: "column ", md: "row" }}>
            <Box w="100%" m={3} display={{base:"", md: "flex"}} borderWidth={2} borderRadius={10}>
                <VStack spacing={3} p={10} m={3} w={{base:"100%", md: "45%"}}>
                    <Text fontWeight={500} fontSize={20}> Enter the information </Text>
                    <FormControl id="user-name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder='Enter the name' variant="filled"/>
                    </FormControl>
                    <FormControl id="user-email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder='Enter the email address' variant="filled"/>
                    </FormControl>
                    <FormControl id="user-password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input placeholder='Enter the password' variant="filled"/>
                    </FormControl>
                    <FormControl id="user-confirm-password" isRequired>
                        <FormLabel>confirmpassword</FormLabel>
                        <Input placeholder='confirm password' variant="filled"/>
                    </FormControl>
                </VStack>
                <VStack spacing={3} p={10} m={3} w={{base:"100%", md: "45%"}}>
                    <Text fontWeight={500} fontSize={20}>Additional Information</Text>
                    <FormControl id="user-image" isRequired>
                        <FormLabel>images</FormLabel>
                        <Input placeholder='Enter the pic' type='file' p={1.5} accept='image/*' variant="filled"/>
                    </FormControl>
                    <FormControl id="user-role" isRequired>
                        <FormLabel>Role</FormLabel>
                        <Select variant="filled" defaultValue="option1">
                            <option value='option1'>user</option>
                            <option value='option2'>admin</option>
                        </Select>
                    </FormControl>
                </VStack>
            </Box>
        </Box>
    </>
  )
}

export default CreateUser