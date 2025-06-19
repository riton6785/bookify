import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserListView from "./UserListView";
import {
  Box,
  useToast,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Heading,
} from "@chakra-ui/react";

export interface UserDetail {
  createdAt: string;
  email: string;
  gender: string;
  name: string;
  pic: string;
  role: string;
  updatedAt: string;
  wishList: [];
  __v: number;
  _id: string;
}
const GetAllUSers = () => {
  const [allusers, setAllUsers] = useState<UserDetail[]>([]);
  const user: User | null = useSelector(
    (state: { userReducer: StateType }) => state.userReducer.user
  );
  const toast = useToast();
  const fetchAllUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:2000/api/user/getallusers`,
        config
      );
      setAllUsers(data);
      console.log(data);
    } catch (error) {
      toast({
        title: "Error fetching Users",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <Box p={6} maxW="100%" overflowX="auto">
      <Heading size="lg" mb={6}>
        Users List
      </Heading>

      <Table variant="simple" size="md">
        <Thead bg="gray.100">
          <Tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>gender</Th>
            <Th>role</Th>
            <Th>Purchases</Th>
            <Th textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allusers.map((user) => (
            <UserListView user={user} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default GetAllUSers;
