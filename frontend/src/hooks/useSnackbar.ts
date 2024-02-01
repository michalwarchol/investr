import { useContext } from "react";
import { SnackbarContext, TType } from "src/providers/SnackbarProvider";

export const useSnackbar = () => {
  const { setSnackbar } = useContext(SnackbarContext);

  const showSnackbar = (type: TType, message: string) => {
    setSnackbar(true, type, message);
  };

  const hideSnackbar = () => {
    setSnackbar(false, 'success', '');
  };

  return {
    showSnackbar,
    hideSnackbar,
  };
};
