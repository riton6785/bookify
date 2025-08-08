import { Box, Grid, GridItem, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import PurchaseCard from '../Products/PurchaseCard';
import { PurchaseData } from '../User/MyPurchases';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../config/config';

const UsersPurchase = () => {
    const {id} = useParams();
    const user: User | null = useSelector((state: {userReducer: StateType}) => state.userReducer.user)
    const [purchaseData, setPurchaseData] = useState<PurchaseData[]>([]);
    const toast = useToast();

    const fetchPurchases = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/user/getpurchases`,
        {
          params: { userId: id},
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
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
}

export default UsersPurchase
