import { Box, Grid, GridItem, useToast, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PurchaseCard from "../Products/PurchaseCard";

export interface PurchaseData {
    orderId: string,
    products: {
        name: string,
        pic: string,
    }[]
    invoice: string,
    date: string,
    amount: number,
}
const UserProfile = () => {
  const toast = useToast();
  const user: User | null = useSelector(
    (state: { userReducer: StateType }) => state.userReducer.user
  );
  const [purchaseData, setPurchaseData] = useState<PurchaseData[]>([])

  const fetchPurchases = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:2000/api/user/getpurchases",
        {
          params: { userId: user?._id },
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(data);
      setPurchaseData(data);
    } catch (error) {
      toast({
        title: `Error while fetching the purchases, ${error}`,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    }
  };
  useEffect(() => {
    fetchPurchases();
  }, []);
  return (
    <Box maxW={{base: "900px", md: "100%"}} mx="auto" mt={8} borderWidth="1px" borderRadius="md">
      {/* Header */}
      <Grid
        templateColumns="3fr 2fr 1fr 2fr 1fr"
        p={3}
        bg="gray.100"
        fontWeight="bold"
        borderBottom="1px solid"
        borderColor="gray.300"
        width="100%"
        alignItems="center"
      >
        <GridItem>Order ID</GridItem>
        <GridItem>Products</GridItem>
        <GridItem>Invoice</GridItem>
        <GridItem>Date</GridItem>
        <GridItem>Price</GridItem>
      </Grid>

      {/* Orders */}
      <VStack spacing={0} align="stretch">
        {purchaseData.map((order) => (
          <PurchaseCard key={order.orderId} order={order} />
        ))}
      </VStack>
    </Box>
  )
};

export default UserProfile;
