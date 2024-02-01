import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Link,
  Tag,
  Text,
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import Layout from "src/components/Layout";
import { Product } from "src/types/Product";
import config from "src/config";

interface IProps {
  product: Product;
}

const ProjectView = ({ product }: IProps) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Box mt={4}>
        <Box mr="100%">
          <Button onClick={() => navigate(-1)} position="static">
            <IoIosArrowBack />
            Back
          </Button>
        </Box>
        <Box mt={8}>
          <Heading fontSize={72} textAlign="start">
            {product.name}
          </Heading>
          <Box borderRadius={4} w={400}>
            <Image src={config.apiUrl + product.image} />
          </Box>
          <Box>
            <HStack spacing={4} mb={8}>
              {product.tags.map((tag) => (
                <Tag size="md" key={tag.id} variant="solid" colorScheme="teal">
                  {tag.name}
                </Tag>
              ))}
            </HStack>
            <Text textAlign="start" fontSize={24}>
              Goal: {product.goal}
            </Text>
            <Text textAlign="start" fontSize={24}>
              Owner: {product.owner.name}
            </Text>
            <Text textAlign="start" mt={2} fontSize={24}>
              Contact info:
            </Text>
            <Text textAlign="start" fontSize={20}>
              Email: {product.contact_email}
            </Text>
            <Text textAlign="start" fontSize={20}>
              Phone: {product.contact_phone}
            </Text>
            <Text textAlign="start" fontSize={24}>
              {product.description}
            </Text>
            <Text textAlign="start" mt={8}>
              <Link href={product.url || "#"} textAlign="start">
                Visit
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default ProjectView;
