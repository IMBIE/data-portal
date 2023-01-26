import { Button, ButtonGroup, Divider } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { FaEnvelope, FaTimes, FaUserLock } from "react-icons/fa";
import FormItem from "../FormItem";

export interface ForgotPasswordProps {
  onCancel?: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onCancel }) => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => alert(JSON.stringify(values))}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <FormItem
            type="email"
            name="email"
            label="Email Address"
            helper="Email address used to register your account"
            placeholder="your.email@domain.com"
            leftElement={<FaEnvelope />}
          />
          <Divider my="6pt" />
          <ButtonGroup w="full" justifyContent="flex-end">
            {onCancel && (
              <Button onClick={onCancel} leftIcon={<FaTimes />} variant="link">
                Cancel
              </Button>
            )}
            <Button
              leftIcon={<FaUserLock />}
              type="submit"
              disabled={!isValid}
              isLoading={isSubmitting}
            >
              Reset Password
            </Button>
          </ButtonGroup>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPassword;
