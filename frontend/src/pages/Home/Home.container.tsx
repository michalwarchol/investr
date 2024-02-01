import { useEffect, useState } from "react";
import axios from "src/utils/axios";
import getQueryParams from "src/utils/getQueryParams";

import HomeView from "./Home.view";
import { Product } from "src/types/Product";
import { useLoader } from "src/hooks/useLoader";

const HomeContainer = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const { showLoader, hideLoader } = useLoader();

  const getProducts = async () => {
    showLoader();
    const products = await axios.get(
      `products?${getQueryParams({ first: 10, page: 1 })}`
    );

    setProducts(products.data.data);
    setTotal(products.data.total);
    hideLoader();
  };

  useEffect(() => {
    getProducts();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <HomeView products={products} total={total} />;
};

export default HomeContainer;
