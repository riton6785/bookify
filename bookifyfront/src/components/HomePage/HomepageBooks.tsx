import { Box, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import { addToCart, toggleWishList } from "../../Redux/cartslice";

const HomepageBooks = () => {
  const [books, setBooks] = useState<Book[]>();
  const toast = useToast();
  const fetchBooks = async (): Promise<void> => {
      try {
        const {data} = await axios.get("http://localhost:2000/api/book/getbooksforhomepage")
        const bookData: Book[] = data
        console.log(bookData)
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

  useEffect(() => {
    fetchBooks();
  }, []);
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
