import { UserDetail } from "./GetAllUSers";
import { Tr, Td, Stack, IconButton, Image, Button } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserListView = ({ user }: { user: UserDetail }) => {
  const navigate = useNavigate();
  const showPurchases = async() => {
    navigate(`/${user._id}/purchase`)
  }

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
        <Button colorScheme="grey" variant="outline" onClick={showPurchases}>
          Purchases
        </Button>
      </Td>
    </Tr>
  );
};

export default UserListView;
