import React from "react";
import { Tr, Td, Stack, IconButton, Image } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookListView = ({ book }: { book: BookListDetails }) => {

  const navigate = useNavigate()
  const editProductHandler = (()=> {
    navigate(`/editproduct/${book._id}`)
    console.log(book)
  })
  return (
    <Tr key={book._id}>
      <Td>
        <Image
          boxSize="60px"
          objectFit="cover"
          src={book.pic}
          alt={book.name}
          borderRadius="md"
        />
      </Td>
      <Td>{book.name}</Td>
      <Td>{book.author}</Td>
      <Td>₹{book.price}</Td>
      <Td>{book.publisher}</Td>
      <Td>
        <Stack direction="row" justify="center">
          <IconButton
            aria-label="Edit"
            icon={<FaEdit />}
            colorScheme="blue"
            size="sm"
            onClick={editProductHandler}
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

export default BookListView;
