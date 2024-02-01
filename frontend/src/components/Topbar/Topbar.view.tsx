import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "src/providers/UserProvider";
import { Role } from "src/types/Role";

const Topbar = () => {
  const { user, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/signin");
  };

  const onNewProjectClick = () => {
    navigate("/new-project");
  };

  const onMyProjectsClick = () => {
    navigate("/my-projects");
  };

  return (
    <Flex
      position="sticky"
      top={0}
      width="100%"
      backgroundColor="teal"
      justifyContent="center"
    >
      <Flex
        width="100%"
        maxWidth={1280}
        backgroundColor="teal"
        padding={4}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        flexDirection={["column", "column", "row"]}
      >
        <Box mb={[10, 10, 0]}>
          <Link to="/">
            <Heading color="white">Investr</Heading>
          </Link>
        </Box>
        <Box>
          {user ? (
            <Menu>
              <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                {user.name}
              </MenuButton>
              <MenuList>
                {user.role === Role.company && (
                  <>
                    <MenuItem onClick={onMyProjectsClick}>My Projects</MenuItem>
                    <MenuItem onClick={onNewProjectClick}>
                      Create project
                    </MenuItem>
                  </>
                )}
                <MenuItem onClick={onLogout}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Box>
              <Link to="/signup">
                <Button marginRight={2}>Sign Up</Button>
              </Link>
              <Link to="/signin">
                <Button marginLeft={2}>Sign In</Button>
              </Link>
            </Box>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Topbar;
