import React, { ReactNode, useState } from "react";

interface IProps {
  children: ReactNode | ReactNode[];
}

interface ILoaderContextState {
  isOpen: boolean;
  setLoader: (isOpen: boolean) => void;
}

export const LoaderContext = React.createContext<ILoaderContextState>({
  isOpen: false,
  setLoader: () => {},
});

export const LoaderProvider = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setLoader = (value: boolean) => {
    setIsOpen(value);
  };

  return (
    <LoaderContext.Provider value={{ isOpen, setLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};
