import { useContext, useEffect, useState } from "react";
import { useLoader } from "src/hooks/useLoader";
import { UserContext } from "src/providers/UserProvider";
import axios from "src/utils/axios";

import MyProjectsView from './MyProjects.view';

const MyProjectsContainer = () => {
  const { user } = useContext(UserContext);
  const { showLoader, hideLoader } = useLoader();
  const [products, setProducts] = useState([]);

  const getProjects = async () => {
    showLoader();
    const result = await axios.get(`products/user/${user?.id}`);
    setProducts(result.data);
    hideLoader();
  };

  const deleteProduct = async (id: string) => {
    showLoader();
    await axios.delete(`products/${id}`);
    await getProjects();
  };

  useEffect(() => {
    getProjects();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <MyProjectsView products={products} deleteProduct={deleteProduct} />;
};

export default MyProjectsContainer;
