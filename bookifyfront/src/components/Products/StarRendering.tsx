import { HStack } from '@chakra-ui/react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRendering = ({rating}: {rating: number}) => {

    const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar color="gold" key={i} />);
      } else if (rating > i - 1 && rating < i) {
        stars.push(<FaStarHalfAlt color="gold" key={i} />);
      } else {
        stars.push(<FaRegStar color="gold" key={i} />);
      }
    }
    return <HStack>{stars}</HStack>;
  };

  return (   
    <>{renderStars(rating)}</>
  )
}

export default StarRendering
