import {
  Box,
  BoxProps,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { Field, useField, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { Option } from "./CheckboxList";

export interface RadioListItemProps extends BoxProps {
  name: string;
  value: string | number;
  label?: string;
  editable?: boolean;
}
export const RadioListItem: React.FC<RadioListItemProps> = ({
  name,
  value,
  label,
  editable,
  ...props
}) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  const checked = field.value?.selection === value;
  const editableValue = field.value && field.value[value];

  const labelText = label || value;
  const showEditable = checked && editable;

  const handleChange = (e) => {
    const newValue = { ...field.value, [value]: e.target.value };
    setFieldValue(name, newValue);
  };

  return (
    <Box {...props}>
      <Radio name={name} value={value}>
        {labelText}
      </Radio>
      {showEditable && (
        <Input
          name={`${name}.${value}.extended`}
          placeholder="Please specify..."
          value={editableValue}
          onChange={handleChange}
          autoFocus
        />
      )}
    </Box>
  );
};

export interface RadioListProps {
  name: string;
  options: Option[];
}
export const RadioList: React.FC<RadioListProps> = ({ name, options }) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (selection) =>
    setFieldValue(name, { ...field.value, selection });

  useEffect(() => setFieldValue(name, { selection: options[0].value }), []);

  return (
    <RadioGroup
      value={field.value?.selection}
      onChange={handleChange}
      defaultValue={options[0].value}
    >
      <Stack spacing="4pt">
        {options.map((optionProps, index) => (
          <RadioListItem key={index} name={name} {...optionProps} />
        ))}
      </Stack>
    </RadioGroup>
  );
};
