import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  Button,
  Link,
  FormControl,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { Link as RouterLink } from "react-router-dom";

import { validationSchema } from "./SignUp.validation";
import { IValues } from "./SignUp.consts";

interface IProps {
  onSubmit: (values: IValues, formikBag: FormikHelpers<IValues>) => void;
  initialValues: IValues;
  loading: boolean;
}

const SignUpView = ({ onSubmit, initialValues, loading }: IProps) => {
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
                    isInvalid={errors.name !== undefined && submitCount > 0}
                    mb={4}
                  >
                    <Input
                      name="name"
                      placeholder="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    {errors.name && submitCount > 0 && (
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    )}
                  </FormControl>
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
                    isInvalid={errors.role !== undefined && submitCount > 0}
                    mb={4}
                  >
                    <Select
                      name="role"
                      placeholder="Select role"
                      mb={4}
                      onChange={handleChange}
                    >
                      <option value="investor">Investor</option>
                      <option value="company">Company</option>
                    </Select>
                    {errors.role && submitCount > 0 && (
                      <FormErrorMessage>{errors.role}</FormErrorMessage>
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
                  <FormControl
                    mb={4}
                    isInvalid={
                      errors.confirmPassword !== undefined && submitCount > 0
                    }
                  >
                    <Input
                      name="confirmPassword"
                      placeholder="confirm password"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && submitCount > 0 && (
                      <FormErrorMessage>
                        {errors.confirmPassword}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <Button colorScheme="teal" type="submit" w="100%" mb={4} disabled={loading}>
                    {loading ? <Spinner size="md" /> : "Sign up"}
                  </Button>
                  <RouterLink to="/signin">
                    <Link mb={4} color="teal">
                      Sign In
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

export default SignUpView;
