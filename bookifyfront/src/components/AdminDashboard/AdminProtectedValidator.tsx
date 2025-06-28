import { Box, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import AuthenticationModel from '../Header/AuthenticationModel'

type AdminProtectedValidatorProps = {
    children: ReactNode
    allowedRoles: string[]
}
const AdminProtectedValidator = (props: AdminProtectedValidatorProps) => {
    const user: User | null = useSelector((state:{userReducer: StateType}) => state.userReducer.user)
    console.log(user)
  if (!user) {
    return(
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} height={"100vh"}>
        <Text fontSize={"5xl"} fontWeight={"bold"}> Unauthorized for this </Text>
        <AuthenticationModel/>
      </Box>
    )
  }

  if (!props.allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return props.children;
}

export default AdminProtectedValidator
