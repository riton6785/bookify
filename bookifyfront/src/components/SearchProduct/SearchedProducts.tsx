import { Box, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import { useLocation } from "react-router-dom";

const SearchedProducts = () => {
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [books, setBooks] = useState<Book[]>();
  const toast = useToast();
  const fetchBooks = async (): Promise<void> => {
    const queryString = searchParams.get('name');
    try {
      const { data } = await axios.get(
        `${BASE_URL}/book/search/getbook`, {
            params: {queryString}
        }
      );
      const bookData: Book[] = data;
      console.log(bookData);
      setBooks(bookData);
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
    fetchBooks();
  }, [location.search]);
  return (
    <>
      <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-between"}>
        {books?.map((book, index) => (
          <ProductCard book={book} key={index} />
        ))}
      </Box>
    </>
  );
};

export default SearchedProducts;
