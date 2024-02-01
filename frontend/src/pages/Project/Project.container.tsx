import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoader } from "src/hooks/useLoader";
import { Product } from "src/types/Product";

import axios from "src/utils/axios";

import ProjectView from "./Project.view";

const ProjectContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [product, setProduct] = useState<Product | null>(null);

  const getProject = async () => {
    showLoader();
    try {
      const result = await axios.get(`products/${location.state.id}`);
      setProduct(result.data);
    } catch {
      navigate("/");
    }
    hideLoader();
  };

  useEffect(() => {
    if (!location.state?.id) {
      navigate("/");
      return;
    }
    getProject();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (product === null) {
    return null;
  }

  return <ProjectView product={product} />;
};

export default ProjectContainer;
