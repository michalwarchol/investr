import { useContext } from "react";
import { LoaderContext } from "src/providers/LoaderProvider";

export const useLoader = () => {
  const { setLoader } = useContext(LoaderContext);

  const showLoader = () => {
    setLoader(true);
  };

  const hideLoader = () => {
    setLoader(false);
  };

  return {
    showLoader,
    hideLoader,
  };
};
