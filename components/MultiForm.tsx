import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Form, Formik } from "formik";
import React from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaCheckCircle,
  FaUndo,
} from "react-icons/fa";
import { Option } from "./form/CheckboxList";
import { MultiFileUploadItem } from "./form/FileUpload";
import FormItem from "./FormItem";

interface StepControlsProps {
  activeStep: number;
  prevStep: () => void;
  nextStep: () => void;
  reset: () => void;
  maxStep: number;
  isSubmitting?: boolean;
  isValid?: boolean;
}

export const StepControls: React.FC<StepControlsProps> = ({
  activeStep,
  nextStep,
  prevStep,
  maxStep,
  reset,
}) => {
  return (
    <Flex justifyContent="space-between" w="full">
      <ButtonGroup>
        <IconButton
          aria-label="back to start"
          onClick={reset}
          variant="outline"
          disabled={activeStep === 0}
        >
          <FaUndo />
        </IconButton>
        <Button
          leftIcon={<FaArrowLeft />}
          onClick={prevStep}
          disabled={activeStep === 0}
          variant="outline"
        >
          Previous
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          rightIcon={<FaCheck />}
          type="submit"
          colorScheme="green"
          disabled={activeStep !== maxStep}
        >
          Submit
        </Button>
        <Button
          rightIcon={<FaArrowRight />}
          onClick={nextStep}
          disabled={activeStep === maxStep}
        >
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export interface MultiFormElement {
  type: React.HTMLInputTypeAttribute;
  name: string;
  label: string;
  helper?: string;
  isRequired?: boolean;
  options?: Option[];
  items?: MultiFileUploadItem[];
}

export interface MultiFormPage {
  title: string;
  description?: string;
  text?: string;
  elements: MultiFormElement[];
}

export interface MultiFormProps {
  pages: MultiFormPage[];
  showReview?: boolean;
}

export const MultiForm: React.FC<MultiFormProps> = ({
  pages = [],
  showReview,
}) => {
  console.log(pages);
  const stepsState = useSteps({
    initialStep: 0,
  });
  const { activeStep } = stepsState;
  const maxPage = showReview ? pages.length : pages.length - 1;

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        console.log(values);
        alert("form submitted");
      }}
    >
      {({ isSubmitting, isValid, values }) => (
        <Form>
          <Steps
            activeStep={activeStep}
            checkIcon={FaCheckCircle}
            orientation="vertical"
            colorScheme="blue"
            // onClickStep={(step) => setStep(step)}
          >
            {pages.map(({ title, description, elements, text }, pageIndex) => (
              <Step
                label={title}
                description={description}
                key={pageIndex}
                textAlign="left"
              >
                {/* <StepControls
                  {...stepsState}
                  maxStep={maxPage}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                />
                <Divider my="8pt" /> */}
                {text && (
                  <Text mb="2em">
                    <span dangerouslySetInnerHTML={{ __html: text }} />
                  </Text>
                )}
                <UnorderedList spacing="12pt">
                  {elements.map((itemProps, elemIndex) => (
                    <ListItem key={elemIndex}>
                      <FormItem {...itemProps} />
                    </ListItem>
                  ))}
                </UnorderedList>
              </Step>
            ))}
            {showReview && (
              <Step
                label="Review"
                description="Review your answers before submitting"
                textAlign="left"
              >
                {/* <StepControls
                  {...stepsState}
                  maxStep={maxPage}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                /> */}
                <Divider my="8pt" />
                {pages.map(({ title, elements }) => (
                  <Box key={title}>
                    <Heading size="md">{title}</Heading>
                    <UnorderedList spacing="12pt">
                      {elements.map((itemProps, index) => (
                        <ListItem key={index}>
                          <Input
                            value={JSON.stringify(values[itemProps.name])}
                            disabled
                          />
                          {/* <FormItem
                            {...itemProps}
                            value={values[itemProps.name]}
                            disabled
                          /> */}
                        </ListItem>
                      ))}
                    </UnorderedList>
                    <Divider my="8pt" />
                  </Box>
                ))}
                <StepControls
                  {...stepsState}
                  maxStep={maxPage}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                />
              </Step>
            )}
          </Steps>
          <Divider my="8pt" />
          <StepControls
            {...stepsState}
            maxStep={maxPage}
            isSubmitting={isSubmitting}
            isValid={isValid}
          />
        </Form>
      )}
    </Formik>
  );
};
