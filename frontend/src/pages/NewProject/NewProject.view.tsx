import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Form, Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";

import Layout from "src/components/Layout";
import { Tag } from "src/types/Tag";

import { IValues } from "./NewProject.consts";
import { validationSchema } from "./NewProject.validation";
import { Role } from "src/types/Role";

interface IProps {
  onSubmit: (values: IValues) => void;
  initialValues: IValues;
  tags: Tag[];
  isEdit: boolean;
}

const NewProjectView = ({ onSubmit, initialValues, tags, isEdit }: IProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Layout requiredRole={Role.company}>
      <Box mt={4}>
        <Box mr="100%">
          <Button onClick={() => navigate(-1)}>
            <IoIosArrowBack />
            Back
          </Button>
        </Box>
        <Box>
          <Heading mb={4}>Create new project</Heading>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, submitCount, values, handleChange, setFieldValue }) => (
              <Form>
                <Flex justifyContent="center">
                  <Box maxWidth={500} width="100%">
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
                      isInvalid={
                        errors.description !== undefined && submitCount > 0
                      }
                      mb={4}
                    >
                      <Textarea
                        name="description"
                        placeholder="description"
                        value={values.description}
                        onChange={handleChange}
                      />
                      {errors.description && submitCount > 0 && (
                        <FormErrorMessage>
                          {errors.description}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      isInvalid={errors.goal !== undefined && submitCount > 0}
                      mb={4}
                    >
                      <Input
                        name="goal"
                        placeholder="goal"
                        type="number"
                        value={values.goal}
                        onChange={handleChange}
                      />
                      {errors.goal && submitCount > 0 && (
                        <FormErrorMessage>{errors.goal}</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      isInvalid={errors.url !== undefined && submitCount > 0}
                      mb={4}
                    >
                      <Input
                        name="url"
                        placeholder="url"
                        value={values.url}
                        onChange={handleChange}
                      />
                      {errors.url && submitCount > 0 && (
                        <FormErrorMessage>{errors.url}</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      isInvalid={
                        errors.contact_email !== undefined && submitCount > 0
                      }
                      mb={4}
                    >
                      <Input
                        name="contact_email"
                        placeholder="contact email"
                        value={values.contact_email}
                        onChange={handleChange}
                      />
                      {errors.contact_email && submitCount > 0 && (
                        <FormErrorMessage>
                          {errors.contact_email}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      isInvalid={
                        errors.contact_phone !== undefined && submitCount > 0
                      }
                      mb={4}
                    >
                      <Input
                        name="contact_phone"
                        placeholder="contact phone"
                        value={values.contact_phone}
                        onChange={handleChange}
                      />
                      {errors.contact_phone && submitCount > 0 && (
                        <FormErrorMessage>
                          {errors.contact_phone}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl mb={4}>
                      <Text textAlign="start">Tags: </Text>
                      <Flex direction="column">
                        {tags.map((tag) => (
                          <Checkbox
                            name="tags"
                            key={tag.id}
                            value={tag.id}
                            onChange={handleChange}
                          >
                            {tag.name}
                          </Checkbox>
                        ))}
                      </Flex>
                    </FormControl>
                    <FormControl
                      isInvalid={values.file === null && submitCount > 0}
                      mb={4}
                    >
                      <Input
                        type="file"
                        onClick={(e) => {
                          e.preventDefault();
                          inputRef.current?.click();
                        }}
                      />
                      <input
                        name="file"
                        type="file"
                        ref={inputRef}
                        hidden
                        onChange={(event) => {
                          if (event.target.files) {
                            setFieldValue("file", event.target.files[0]);
                          }
                        }}
                      />
                      {values.file && submitCount > 0 && (
                        <FormErrorMessage>
                          This field is required
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    <Button type="submit" colorScheme="teal">
                      Create
                    </Button>
                  </Box>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Layout>
  );
};

export default NewProjectView;
