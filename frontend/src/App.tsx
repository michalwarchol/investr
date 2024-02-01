import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { UserProvider } from "src/providers/UserProvider";
import { LoaderProvider } from "src/providers/LoaderProvider";
import { SnackbarProvider } from "./providers/SnackbarProvider";

import Home from "src/pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NewProject from "./pages/NewProject";
import MyProjects from "./pages/MyProjects";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "new-project",
    element: <NewProject />,
  },
  {
    path: "my-projects",
    element: <MyProjects />,
  },
]);

function App() {
  return (
    <ChakraProvider>
      <SnackbarProvider>
        <LoaderProvider>
          <UserProvider>
            <div className="App">
              <RouterProvider router={router} />
            </div>
          </UserProvider>
        </LoaderProvider>
      </SnackbarProvider>
    </ChakraProvider>
  );
}

export default App;
