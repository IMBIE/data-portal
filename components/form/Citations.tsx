import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Stack,
  StackDivider,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React, { useState } from "react";
import { FaPenFancy, FaPlus, FaTimes, FaUpload } from "react-icons/fa";
import FileUpload from "./FileUpload";

export interface CitationProps {
  isDeletable?: boolean;
  description: string;
  doi: string;
  onDelete?: () => void;
  onDescriptionChange: (value: string) => void;
  onDOIChange: (value: string) => void;
}
export const Citation: React.FC<CitationProps> = ({
  isDeletable = false,
  description,
  doi,
  onDelete,
  onDOIChange,
  onDescriptionChange,
}) => {
  return (
    <Box rounded="8pt" boxShadow="md" p="4pt">
      <Flex>
        <Box flex="1">
          <FormLabel>Citation</FormLabel>
          <FormHelperText>
            Please provide a short description and a DOI
          </FormHelperText>
        </Box>
        {onDelete && (
          <IconButton
            aria-label="Delete citation"
            icon={<FaTimes />}
            rounded="full"
            onClick={onDelete}
            variant="ghost"
            disabled={!isDeletable}
            justifySelf="flex-end"
          />
        )}
      </Flex>
      <Textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="description..."
        mb="4pt"
      />
      <Input
        value={doi}
        onChange={(e) => onDOIChange(e.target.value)}
        placeholder="Enter DOI"
      />
    </Box>
  );
};

export const emptyCitation = { description: "", doi: "" };

export interface CitationsProps {
  name: string;
}
export const Citations: React.FC<CitationsProps> = ({ name }) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  const citations = field.value || [emptyCitation];

  const handleChange = (index: number, field: string, value: string) => {
    const newValue = { ...citations[index], [field]: value };
    citations[index] = newValue;
    setFieldValue(name, citations);
  };
  const createDeleteHandler = (index: number) => () => {
    citations.splice(index, 1);
    setFieldValue(name, citations);
  };
  const handleAdd = (_) => {
    setFieldValue(name, [...citations, emptyCitation]);
  };

  return (
    <Stack spacing="8pt">
      {citations.map((values, index) => (
        <Citation
          key={index}
          {...values}
          isDeletable={citations.length > 1}
          onDOIChange={(value) => handleChange(index, "doi", value)}
          onDescriptionChange={(value) =>
            handleChange(index, "description", value)
          }
          onDelete={createDeleteHandler(index)}
        />
      ))}
      <Flex justifyContent="flex-end">
        <Button leftIcon={<FaPlus />} colorScheme="gray" onClick={handleAdd}>
          Add Item
        </Button>
      </Flex>
    </Stack>
  );
};

export interface CiteOrUploadProps {
  name: string;
}
export const CiteOrUpload: React.FC<CiteOrUploadProps> = ({ name }) => {
  const [upload, setUpload] = useState(false);
  const handleToggleMode = () => setUpload(!upload);

  const citeFieldName = name + ".cite";
  const [citationField] = useField(citeFieldName);
  const { setFieldValue } = useFormikContext();

  const { doi, description } = citationField.value || emptyCitation;
  const handleCiteChange = (field: string, value: string) => {
    const newValue = { doi, description, [field]: value };
    setFieldValue(citeFieldName, newValue);
  };

  return (
    <Stack>
      <FormControl display="flex" alignItems="center" justifyContent="flex-end">
        <FormLabel htmlFor={`${name}.mode-toggle`} mb="0">
          {upload ? (
            <Flex alignItems="center">
              <FaPenFancy color="grey.500" />
              <Text ml="1ch">Provide Citation</Text>
            </Flex>
          ) : (
            <Flex alignItems="center">
              <FaUpload color="grey.500" />
              <Text ml="1ch">Upload Document</Text>
            </Flex>
          )}
        </FormLabel>
        <Switch
          id={`${name}.mode-toggle`}
          isChecked={upload}
          onChange={handleToggleMode}
        />
      </FormControl>
      {/* <Button
        onClick={handdleToggleMode}
        leftIcon={upload ? <FaPenFancy /> : <FaUpload />}
      >
        {upload ? "Provide Citation" : "Upload Document"}
      </Button> */}
      <StackDivider my="8pt" />
      {upload ? (
        <FileUpload name={name + ".upload"} />
      ) : (
        <Citation
          doi={doi}
          description={description}
          onDOIChange={(value) => handleCiteChange("doi", value)}
          onDescriptionChange={(value) =>
            handleCiteChange("description", value)
          }
        />
      )}
    </Stack>
  );
};

export default Citations;
