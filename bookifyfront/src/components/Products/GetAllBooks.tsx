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
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookListView from "./BookListView";
import { BASE_URL } from "../../config/config";

const GetAllBooks = () => {
  const user: User | null = useSelector(
    (state: { userReducer: StateType }) => state.userReducer.user
  );
  const toast = useToast();
  const [books, setBooks] = useState<BookListDetails[]>([]);
  const fetchBookDetails = async (): Promise<void> => {
    try {
      const config = {
        headers: {
          "Content-TYpe": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get(
        `${BASE_URL}/book/getallbooks`,
        config
      );
      setBooks(data);
    } catch (error) {
      toast({
        title: "Error fetching books",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  useEffect(() => {
    fetchBookDetails();
  }, []);
  return (
    <Box p={6} maxW="100%" overflowX="auto">
      <Heading size="lg" mb={6}>
        Books List
      </Heading>

      <Table variant="simple" size="md">
        <Thead bg="gray.100">
          <Tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Author</Th>
            <Th>Price</Th>
            <Th>Publisher</Th>
            <Th textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {books.map((book) => (
            <BookListView book={book} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default GetAllBooks;
