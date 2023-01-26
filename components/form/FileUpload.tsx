import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Stack,
} from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import { FaTimes, FaUpload } from "react-icons/fa";

export interface FileUploadProps {
  name: string;
}
export const FileUpload: React.FC<FileUploadProps> = ({ name }) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  const [displayValue, setDisplayValue] = useState("");

  const handleClear = () => {
    setDisplayValue("");
    setFieldValue(name, undefined);
  };
  const inputRef = React.useRef<HTMLInputElement>();

  const handleClick = () => {
    if (inputRef?.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };
  const handleFileChange = (e) => {
    setFieldValue(name, e.target.files);
    setDisplayValue(e.target.files[0].name);
  };

  return (
    <InputGroup>
      <InputLeftElement color="gray.500">
        <FaUpload />
      </InputLeftElement>
      <input
        type="file"
        name={field.name}
        value={undefined}
        onChange={handleFileChange}
        ref={inputRef}
        hidden
      />
      <Input
        onBlur={field.onBlur}
        value={displayValue}
        placeholder="Select a file to upload"
        readOnly={true}
        isReadOnly={true}
        onClick={handleClick}
      />
      <InputRightAddon px={0}>
        <Button onClick={handleClear} colorScheme="gray" leftIcon={<FaTimes />}>
          Clear
        </Button>
      </InputRightAddon>
    </InputGroup>
  );
};

export interface MultiFileUploadItem {
  name: string;
  label: string;
}

export interface MultiFileUploadProps {
  items: MultiFileUploadItem[];
}
export const MultiFileUpload: React.FC<MultiFileUploadProps> = ({ items }) => {
  return (
    <Stack spacing="4pt">
      {items.map(({ name, label }) => (
        <FormControl key={name}>
          <FormLabel>{label}</FormLabel>
          <FileUpload name={name} />
        </FormControl>
      ))}
    </Stack>
  );
};

export default FileUpload;
