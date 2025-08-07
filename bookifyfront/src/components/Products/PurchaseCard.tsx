import {
  Box,
  Avatar,
  AvatarGroup,
  Text,
  Link,
  Grid,
  GridItem,
  Tooltip

} from "@chakra-ui/react";
import { PurchaseData } from "../User/MyPurchases";

const PurchaseCard = ({ order }: {order: PurchaseData}) => {
  const { orderId, products, invoice, date, amount } = order;
  const maxVisible = 3;
  const visibleProducts = products.slice(0, maxVisible);
  const remaining = products.length - maxVisible;

  return (
    <Grid
      templateColumns="3fr 2fr 1fr 2fr 1fr"
      alignItems="center"
      gap={4}
      p={3}
      borderBottom="1px solid"
      borderColor="gray.200"
      width="100%"
    >
      {/* Order ID */}
      <GridItem>
        <Text fontWeight="bold" isTruncated>
          {orderId}
        </Text>
      </GridItem>

      {/* Products */}
      <GridItem>
        <AvatarGroup size="sm" max={maxVisible}>
          {visibleProducts.map(({ pic, name }, i) => (
            <Tooltip label={name} placement="top" openDelay={300} key={i}>
                <Avatar src={pic} name={name} />
            </Tooltip>
          ))}
          {remaining > 0 && (
            <Box
              bg="gray.200"
              borderRadius="full"
              width="28px"
              height="28px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
              fontWeight="bold"
              color="gray.600"
              userSelect="none"
              ml={1}
            >
              +{remaining}
            </Box>
          )}
        </AvatarGroup>
      </GridItem>

      {/* Invoice */}
      <GridItem>
        <Link href={invoice} color="blue.500" isExternal fontSize="sm">
          View Invoice
        </Link>
      </GridItem>

      {/* Date */}
      <GridItem>
        <Text fontSize="sm">{new Date(date).toLocaleDateString()}</Text>
      </GridItem>

      {/* Amount */}
      <GridItem>
        <Text fontWeight="semibold">{amount}</Text>
      </GridItem>
    </Grid>
  );
};

export default PurchaseCard;
