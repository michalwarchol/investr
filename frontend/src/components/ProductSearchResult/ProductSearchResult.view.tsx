import {
  Box,
  Image,
  Heading,
  Tag,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";

import { Product } from "src/types/Product";
import config from "src/config";
import { Link } from "react-router-dom";
import { UserContext } from "src/providers/UserProvider";
import { useContext } from "react";

interface IProps {
  product: Product;
  deleteProduct?: (id: string) => void;
}

const ProductSearchResult = ({ product, deleteProduct }: IProps) => {
  const { user } = useContext(UserContext);

  return (
    <Link to="/product" state={{ id: product.id }}>
      <Box
        ml={4}
        mr={4}
        p={4}
        width={[500, 380]}
        transition="background-color 0.2s ease-in-out"
        borderRadius={8}
        _hover={{
          backgroundColor: "#00000033",
        }}
      >
        <Box borderRadius={4} overflow="hidden">
          <Image src={config.apiUrl + product.image} />
        </Box>
        <Box>
          <Heading textAlign="start">{product.name}</Heading>
          <HStack spacing={4}>
            {product.tags.map((tag) => (
              <Tag size="md" key={tag.id} variant="solid" colorScheme="teal">
                {tag.name}
              </Tag>
            ))}
          </HStack>
          <Text textAlign="start">Goal: {product.goal}</Text>
          <Text textAlign="start">Owner: {product.owner.name}</Text>
          {deleteProduct && user && user.id === product.owner.id && (
            <Button
              top={0}
              right={0}
              onClick={(event) => {
                event.stopPropagation();
                deleteProduct(product.id);
              }}
              colorScheme="teal"
            >
              Delete
            </Button>
          )}
        </Box>
      </Box>
    </Link>
  );
};

export default ProductSearchResult;
