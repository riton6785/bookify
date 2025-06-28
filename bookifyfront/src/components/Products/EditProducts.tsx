import {
  Box,
  Button,
  HStack,
  Text,
  FormControl,
  Input,
  VStack,
  FormLabel,
  Textarea,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Select from "react-dropdown-select";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { label } from "framer-motion/client";
import { useParams } from "react-router-dom";

interface GenresForOption {
  value: string;
  label: string;
}

interface BookUpdate {
  name?: string;
  author?: string;
  price?: number;
  publisher?: string;
  stock?: number;
  description?: string;
  genres_ids?: string[];
}

const EditProducts = () => {
  const [name, setName] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [pic, setPic] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [publisher, setPublisher] = useState<string>();
  const [genres, setGenres] = useState<{ _id: string; name: string }[]>();
  const [createGenres, setCreateGenres] = useState<string>();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetchedGenres, setFetchedGenres] = useState<GenresBasics[]>();
  const [allOptions, setAllOptions] = useState<GenresForOption[]>([]);
  const [initialOptions, setInitialOptions] = useState<GenresForOption[]>([]);
  const [genreForBook, setGenreForBook] = useState<
    GenresForOption[] | undefined
  >();
  const [changedFields, setChangedFields] = useState<BookUpdate>({});
  const [bookDetail, setBookDetail] = useState<BookListDetails>();
  const user: User | null = useSelector(
    (state: { userReducer: StateType }) => state.userReducer.user
  );

  const params = useParams();

  const setStatesFromCurrentDetails = (data: BookListDetails) => {
    setName(data.name);
    setAuthor(data.author);
    setPrice(data.price);
    setDescription(data.description);
    setStock(data.stock);
    setPublisher(data.publisher);
    setGenres(data.genres_id);
  };
  const fetchProductDetails = async (
    id: string | undefined,
    options: GenresForOption[] = allOptions
  ) => {
    try {
      const { data } = await axios.get(
        "http://localhost:2000/api/book/bookbyid",
        {
          params: { id },
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setBookDetail(data);
      setStatesFromCurrentDetails(data);
      const matched = options.filter((opt) =>
        data.genres_ids.some((genre) => genre._id === opt.value)
      );
      console.log(matched, options, data, "Fetch Product details");
      setInitialOptions(matched);
    } catch (error) {
      console.error("Failed to fetch book by ID:", error);
      throw error;
    }
  };

  const SaveProduct = async () => {
    console.log("Buttonclickeddddddd");
    try {
      const fields = ["name", "author"];
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:2000/api/book/updatebook/${bookDetail._id}`,
        { changedFields },
        config
      );
      setChangedFields({});
      toast({
        title: "Record updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error while updating record",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const createGenresHandler = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:2000/api/genres/creategenre",
        { name: createGenres },
        config
      );
    } catch (error) {
      toast({
        title: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    onClose();
  };

  const fetchGenresHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        "http://localhost:2000/api/genres/getallgenres",
        config
      );
      setFetchedGenres(data);
      const mappedOptions =
        data?.map((genre) => ({
          value: genre._id,
          label: genre.name,
        })) || [];

      console.log(data, "Fetched genres handler");
      fetchProductDetails(params.id, mappedOptions);
      setAllOptions(mappedOptions);
    } catch (error) {
      toast({
        title: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleChangedFields = <K extends keyof BookUpdate>(
    field: K,
    value: BookUpdate[K]
  ) => {
    setChangedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenresChanges = (values: GenresForOption[]) => {
    const genres_ids = values.map((genre) => genre.value);
    handleChangedFields("genres_ids", genres_ids);
  };
  useEffect(() => {
    fetchGenresHandler();
  }, []);

  return (
    <>
      <Box borderBottomColor="gray.300" borderBottomWidth={2} m={7}>
        <HStack display="flex" justifyContent="space-between" m={2}>
          <Text fontWeight={500} fontSize={20}>
            Edit Product
          </Text>
          <HStack>
            <Button colorScheme="teal" borderRadius="20px" onClick={onOpen}>
              CreateGenres
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create genres</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl id="book-genre">
                    <FormLabel>Genres</FormLabel>
                    <Input
                      placeholder="Enter the Genres"
                      variant="filled"
                      onChange={(e) => setCreateGenres(e.target.value)}
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="gray"
                    borderRadius="20px"
                    mr={3}
                    onClick={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    colorScheme="teal"
                    borderRadius="20px"
                    onClick={createGenresHandler}
                  >
                    Create
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Button
              colorScheme="gray"
              borderRadius="20px"
              onClick={SaveProduct}
              isLoading={loading}
            >
              Save Product
            </Button>
          </HStack>
        </HStack>
      </Box>
      <Box m={10} display="flex" flexDirection={{ base: "column ", md: "row" }}>
        <Box
          w="100%"
          m={3}
          display={{ base: "", md: "flex" }}
          borderWidth={2}
          borderRadius={10}
        >
          <VStack spacing={3} p={10} m={3} w={{ base: "100%", md: "45%" }}>
            <Text fontWeight={500} fontSize={20}>
              {" "}
              Enter the information{" "}
            </Text>
            <FormControl id="book-name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter the name"
                variant="filled"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  handleChangedFields("name", e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="author-name" isRequired>
              <FormLabel>Author Name</FormLabel>
              <Input
                placeholder="Enter the Author name"
                variant="filled"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  handleChangedFields("author", e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="book-price" isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="Enter the Price"
                variant="filled"
                value={price}
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                  handleChangedFields("price", Number(e.target.value));
                }}
              />
            </FormControl>
            {/* <FormControl id="book-image" isRequired>  Need to check image editing 
                        <FormLabel>images</FormLabel>
                        <Input placeholder='Enter the pic' type='file' p={1.5} accept='image/*' variant="filled" onChange={(e)=> handleImage(e.target.files[0])}/>
                    </FormControl> */}
          </VStack>
          <VStack spacing={3} p={10} m={3} w={{ base: "100%", md: "45%" }}>
            <Text fontWeight={500} fontSize={20}>
              Additional Information
            </Text>
            <FormControl id="book-publisher" isRequired>
              <FormLabel>Publisher</FormLabel>
              <Input
                placeholder="Enter the Publisher"
                variant="filled"
                value={publisher}
                onChange={(e) => {
                  setPublisher(e.target.value);
                  handleChangedFields("publisher", e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="book-stock">
              <FormLabel>Stock</FormLabel>
              <Input
                placeholder="Enter the stock"
                variant="filled"
                value={stock}
                onChange={(e) => {
                  setStock(Number(e.target.value));
                  handleChangedFields("stock", Number(e.target.value));
                }}
              />
            </FormControl>
            <FormControl id="book-description">
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter the description"
                value={description}
                variant="filled"
                onChange={(e) => {
                  setDescription(e.target.value);
                  handleChangedFields("description", e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              {allOptions.length > 0 ? (
                <FormControl id="book-genres">
                  <FormLabel>Genres</FormLabel>
                  <Select
                    options={allOptions}
                    values={initialOptions}
                    onChange={(values) => {
                      setGenreForBook(values);
                      handleGenresChanges(values);
                    }}
                    multi={true}
                  />
                </FormControl>
              ) : (
                <Text>Loading</Text>
              )}
            </FormControl>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default EditProducts;
