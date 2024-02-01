import { Box, Flex, Spinner, Stack } from "@chakra-ui/react";
import { ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "src/components/Topbar";
import { LoaderContext } from "src/providers/LoaderProvider";
import { UserContext } from "src/providers/UserProvider";
import { Role } from "src/types/Role";

interface IProps {
  children: ReactNode | ReactNode[];
  requiredRole?: Role;
}

const Layout = ({ children, requiredRole }: IProps) => {
  const { isOpen } = useContext(LoaderContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (
    (user && requiredRole && user.role !== requiredRole) ||
    (!user && requiredRole)
  ) {
    navigate("/");
  }

  if (isOpen) {
    return (
      <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
        <Stack direction="row" spacing={4}>
          <Spinner size="md" />
        </Stack>
      </Flex>
    );
  }

  return (
    <Box>
      <Topbar />
      <Box
        width={["100%", "100%", "100%", "100%", "100%", 1280]}
        margin="0 auto"
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
