import { Box, Flex, Heading } from "@chakra-ui/react";
import Layout from "src/components/Layout";
import ProductSearchResult from "src/components/ProductSearchResult";
import { Product } from "src/types/Product";
import { Role } from "src/types/Role";

interface IProps {
  products: Product[];
  deleteProduct: (id: string) => void;
}

const MyProjectsView = ({ products, deleteProduct }: IProps) => {
  return (
    <Layout requiredRole={Role.company}>
      <Box>
        <Heading>My projects</Heading>
      </Box>
      <Flex flexWrap="wrap" mt={4} justifyContent="space-between">
        {products.map((product) => (
          <ProductSearchResult
            product={product}
            key={product.id}
            deleteProduct={deleteProduct}
          />
        ))}
      </Flex>
    </Layout>
  );
};

export default MyProjectsView;
