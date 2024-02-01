import React, { ReactNode, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

interface IProps {
  children: ReactNode | ReactNode[];
}

export type TType = "success" | "error";

interface ISnackbarContextState {
  isVisible: boolean;
  type: TType;
  message: string;
  setSnackbar: (value: boolean, type: TType, message: string) => void;
}

export const SnackbarContext = React.createContext<ISnackbarContextState>({
  isVisible: false,
  type: "success",
  message: "",
  setSnackbar: () => {},
});

export const SnackbarProvider = ({ children }: IProps) => {
  const toast = useToast();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [type, setType] = useState<TType>("success");
  const [message, setMessage] = useState<string>("");

  const setSnackbar = (value: boolean, type: TType, message: string) => {
    setIsVisible(value);
    setType(type);
    setMessage(message);
  };

  useEffect(() => {
    if (isVisible) {
      toast({
        title: message,
        status: type,
        duration: 9000,
        isClosable: true,
        onCloseComplete: () => setIsVisible(false),
      });
      setTimeout(() => setIsVisible(false), 9000);
    }
  }, [isVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SnackbarContext.Provider value={{ isVisible, type, message, setSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};
