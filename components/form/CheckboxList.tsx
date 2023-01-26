import {
  Box,
  BoxProps,
  Checkbox,
  Input,
  Radio,
  Stack,
  StackProps,
} from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React from "react";

export interface Option {
  value: string | number;
  label?: string;
  editable?: boolean;
}

export interface CheckboxListItemProps extends BoxProps {
  name: string;
  value: string | number;
  label?: string;
  editable?: boolean;
  editComponent?: React.Component;
}

export const CheckboxListItem: React.FC<CheckboxListItemProps> = ({
  name,
  value,
  label,
  editable,
  editComponent = Input,
  ...props
}) => {
  const labelText = label || value;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const { value: formikValue } = field;
  const fieldValue = formikValue || {};
  const currentValue = fieldValue[value];
  const checked = currentValue !== undefined;

  const handleChange = () => {
    if (checked) {
      setFieldValue(name, {
        ...fieldValue,
        [value]: undefined,
      });
    } else {
      setFieldValue(name, {
        ...fieldValue,
        [value]: editable ? "" : true,
      });
    }
  };
  const handleEdit = (e) => {
    setFieldValue(name, {
      ...fieldValue,
      [value]: e.target.value,
    });
  };
  const showEditable = editable && checked;

  return (
    <Box {...props}>
      <Checkbox
        {...field}
        checked={checked}
        isChecked={checked}
        onChange={handleChange}
      >
        {labelText}
      </Checkbox>
      {/* {showEditable && <Field name={editableName} component={editComponent} />} */}
      {showEditable && (
        <Input
          name={`${name}.${value}.extended`}
          onChange={handleEdit}
          value={currentValue}
          placeholder="Please specify..."
          autoFocus
        />
      )}
    </Box>
  );
};

export interface CheckboxListProps extends StackProps {
  name: string;
  options: Option[];
}

export const CheckboxList = ({ name, options, ...props }) => {
  return (
    <Stack spacing="4pt" {...props}>
      {options.map((optionProps, index) => (
        <CheckboxListItem key={index} {...optionProps} name={name} />
      ))}
    </Stack>
  );
};

export default CheckboxList;
