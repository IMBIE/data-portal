import {
  Button,
  ButtonGroup,
  Container,
  ContainerProps,
  Divider,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import {
  FaArrowLeft,
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import FormItem from "../FormItem";

export const Register: React.FC<ContainerProps> = ({ ...props }) => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => alert(JSON.stringify(values))}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Container {...props}>
            <Heading>Create Profile</Heading>
            <Stack spacing="2ch" alignItems="flex-start">
              <FormItem
                name="name"
                label="Full Name"
                placeholder="Your Name"
                leftElement={<FaUser />}
              />
              <FormItem
                name="institution"
                label="Institution"
                placeholder="Institution name"
                helper="University or research group"
                leftElement={<FaBuilding />}
              />
              <FormItem
                name="email"
                label="Email Address"
                placeholder="your.name@domain.com"
                helper="Email address we can use to contact you regarding your submission"
                type="email"
                leftElement={<FaEnvelope />}
              />
              <FormItem
                name="password"
                label="Password"
                placeholder="password"
                type="password"
                helper="Create a password for your account"
                leftElement={<FaLock />}
              />
              <FormItem
                name="confirm"
                label="Confirm Password"
                placeholder="password"
                type="password"
                helper="Please re-type your password"
                leftElement={<FaLock />}
              />
              <FormItem
                name="phone"
                label="Phone Number"
                placeholder="Phone number"
                type="tel"
                helper="Phone number with country code"
                leftElement={<FaPhone />}
              />
            </Stack>
            <Divider my="8pt" />
            <ButtonGroup justifyContent="flex-end" w="full">
              <Button
                leftIcon={<FaArrowLeft />}
                onClick={() => router.back()}
                variant="link"
              >
                Cancel
              </Button>
              <Button
                leftIcon={<FaUserPlus />}
                isLoading={isSubmitting}
                disabled={!isValid}
                type="submit"
              >
                Create Account
              </Button>
            </ButtonGroup>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
