import { Flex } from "@chakra-ui/react";

import Layout from "src/components/Layout";
import ProductSearchResult from "src/components/ProductSearchResult";
import { Product } from "src/types/Product";

interface IProps {
  products: Product[];
  total: number;
}

const HomeView = ({ products }: IProps) => {
  return (
    <Layout>
      <Flex flexWrap="wrap" mt={4} justifyContent="space-between">
        {products.map((product) => (
          <ProductSearchResult product={product} key={product.id} />
        ))}
      </Flex>
    </Layout>
  );
};

export default HomeView;
