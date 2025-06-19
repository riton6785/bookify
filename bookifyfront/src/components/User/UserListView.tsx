import React from "react";
import { UserDetail } from "./GetAllUSers";
import { Tr, Td, Stack, IconButton, Image, Button } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserListView = ({ user }: { user: UserDetail }) => {
  return (
    <Tr key={user._id}>
      <Td>
        <Image
          boxSize="60px"
          objectFit="cover"
          src={user.pic}
          alt={user.name}
          borderRadius="md"
        />
      </Td>
      <Td>{user.name}</Td>
      <Td>{user.email}</Td>
      <Td>₹{user.gender}</Td>
      <Td>{user.role}</Td>
      <Td>
        <Button colorScheme="grey" variant="outline">
          Purchases
        </Button>
      </Td>
      <Td>
        <Stack direction="row" justify="center">
          <IconButton
            aria-label="Edit"
            icon={<FaEdit />}
            colorScheme="blue"
            size="sm"
          />
          <IconButton
            aria-label="Delete"
            icon={<FaTrash />}
            colorScheme="red"
            size="sm"
          />
        </Stack>
      </Td>
    </Tr>
  );
};

export default UserListView;
