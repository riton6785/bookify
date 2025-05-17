import { Box, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Products/ProductCard";

const HomepageBooks = () => {
  const [books, setBooks] = useState<Book[]>();
  const toast = useToast();
  useEffect(() => {
    const fetchBooks = async (): Promise<void> => {
      console.log("helllo");
      try {
        const {data} = await axios.get("http://localhost:2000/api/book/getbooksforhomepage")
        const bookData: Book[] = data
        setBooks(bookData)
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
    fetchBooks();
  });
  return <>
    <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-between"} >
      {
        books?.map((book, index)=> (
            <ProductCard book={book} key={index}/>
        ))
      }
    </Box>
  </>
};

export default HomepageBooks;
