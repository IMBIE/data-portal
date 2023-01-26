import { Button, ButtonGroup, Divider, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import {
  FaEnvelope,
  FaLock,
  FaQuestion,
  FaSignInAlt,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";
import FormItem from "../FormItem";

export interface LoginProps {
  onCancel?: () => void;
}
export const Login: React.FC<LoginProps> = ({ onCancel }) => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => alert(JSON.stringify(values))}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Stack spacing="6pt">
            <FormItem
              name="email"
              type="email"
              label="Account email address"
              placeholder="your.email@domain.com"
              helper="The email address you used to register your account"
              leftElement={<FaEnvelope />}
            />
            <FormItem
              name="password"
              type="password"
              label="Account password"
              placeholder="password"
              helper="Secure password for your account"
              leftElement={<FaLock />}
            />
          </Stack>
          <Divider my="6pt" />
          <ButtonGroup w="full" justifyContent="flex-end">
            {onCancel && (
              <Button
                variant="outline"
                onClick={onCancel}
                leftIcon={<FaTimes />}
              >
                Cancel
              </Button>
            )}
            <Button variant="outline" leftIcon={<FaQuestion />}>
              <Link href="/forgot-password">Forgot Password</Link>
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={!isValid}
              leftIcon={<FaSignInAlt />}
            >
              Log In
            </Button>
          </ButtonGroup>
        </Form>
      )}
    </Formik>
  );
};
