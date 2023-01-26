import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import Citations, { CiteOrUpload } from "./form/Citations";
import FileUpload, {
  MultiFileUpload,
  MultiFileUploadItem,
} from "./form/FileUpload";
import CheckboxList, { Option } from "./form/CheckboxList";
import PasswordInput from "./form/PasswordInput";
import { RadioList } from "./form/RadioList";

type FormItemProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  name: string;
  label: string;
  helper?: string;
  options?: Option[];
  items?: MultiFileUploadItem[];
  leftElement?: React.ReactElement;
};

export const FormItem: React.FC<FormItemProps> = ({
  label,
  helper,
  options,
  items,
  leftElement,
  ...props
}) => {
  let inputElement;
  const [field, { error }] = useField(props);
  const { name } = props;

  switch (props.type) {
    case "citations":
      inputElement = <Citations name={name} />;
      break;
    case "cite-upload":
      inputElement = <CiteOrUpload name={name} />;
      break;
    case "password":
      inputElement = (
        <PasswordInput
          {...field}
          leftElement={leftElement}
          inputProps={props}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <Textarea
          {...field}
          // {...props}
          id={name}
          placeholder={props.placeholder}
        />
      );
      break;
    case "file":
      inputElement = <FileUpload name={name} />;
      break;
    case "multi-file":
      inputElement = <MultiFileUpload items={items} />;
      break;
    case "radio":
      inputElement = <RadioList name={props.name} options={options} />;
      break;
    case "checkbox":
      inputElement = <CheckboxList name={props.name} options={options} />;
      break;
    // case "radio":
    //   inputElement = (
    //     <RadioGroup {...field}>
    //       <Stack spacing="6pt">
    //         {options.map(({ value, label }, index) => (
    //           <Radio value={value} key={index}>
    //             {label}
    //           </Radio>
    //         ))}
    //       </Stack>
    //     </RadioGroup>
    //   );
    //   break;
    case "select":
      inputElement = (
        <Select {...field}>
          {options.map(({ value, label }, index) => (
            <option value={value} key={index}>
              {label}
            </option>
          ))}
        </Select>
      );
      break;
    default:
      inputElement = (
        <InputGroup>
          {leftElement && (
            <InputLeftElement color="gray.500">{leftElement}</InputLeftElement>
          )}
          <Input {...field} {...props} id={field.name} />
        </InputGroup>
      );
      break;
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>
        <p dangerouslySetInnerHTML={{ __html: label }} />
      </FormLabel>
      {inputElement}
      {helper && (
        <FormHelperText textAlign="left">
          <p dangerouslySetInnerHTML={{ __html: helper }} />
        </FormHelperText>
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormItem;
