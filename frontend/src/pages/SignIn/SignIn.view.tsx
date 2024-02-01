import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Link,
  FormControl,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { Link as RouterLink } from "react-router-dom";

import { validationSchema } from "./SignIn.validation";
import { IValues } from "./SignIn.consts";

interface IProps {
  onSubmit: (values: IValues, formikBag: FormikHelpers<IValues>) => void;
  initialValues: IValues;
  loading: boolean;
}

const SignInView = ({ onSubmit, initialValues, loading }: IProps) => {
  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Box
        borderColor="teal"
        borderRadius={8}
        borderWidth={2}
        p={4}
        w={[480, 500, 600]}
      >
        <RouterLink to="/">
          <Heading color="teal" mb={10}>
            Investr
          </Heading>
        </RouterLink>
        <Box>
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, errors, submitCount }) => (
              <Form>
                <Box w="100%">
                  <FormControl
                    isInvalid={errors.email !== undefined && submitCount > 0}
                    mb={4}
                  >
                    <Input
                      name="email"
                      type="email"
                      placeholder="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email && submitCount > 0 && (
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={errors.password !== undefined && submitCount > 0}
                    mb={4}
                  >
                    <Input
                      name="password"
                      placeholder="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    {errors.password && submitCount > 0 && (
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    )}
                  </FormControl>
                  <Button
                    colorScheme="teal"
                    type="submit"
                    w="100%"
                    mb={4}
                    disabled={loading}
                  >
                    {loading ? <Spinner size="md" /> : "Sign in"}
                  </Button>
                  <RouterLink to="/signup">
                    <Link mb={4} color="teal">
                      Sign Up
                    </Link>
                  </RouterLink>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignInView;
