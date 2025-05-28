import { Avatar, Box, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import StarRendering from './StarRendering'

const RenderReviews = ({review}: {review: ReviewData}) => {
  return (
    <HStack align="center" w="100%" bg="gray.50" p={4} borderRadius="md">
        <Avatar name={review.userId.name} src={review.userId.pic} mr={10}/>
        <VStack align="start" justify="space-between" flex="1" spacing={2}>
            <p><strong>{review.userId.name}</strong></p>
            <p>{review.review}</p>
            <HStack>
            <StarRendering rating={review.rating} />
            </HStack>
        </VStack>
    </HStack>
  )
}

export default RenderReviews