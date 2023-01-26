import { Box, Checkbox, Input } from "@chakra-ui/react";
import React, { useState } from "react";

export type FormCheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "aria-invalid"
> & {
  field: any;
  form: any;
  value: string | number;
  label?: string;
  editable?: boolean;
};

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  field,
  form,
  label,
  editable,
  size: _,
  ...rest
}) => {
  const ref = React.useRef();

  const { name, value: formikValue } = field;
  const { setFieldValue } = form;

  const labelText = label || rest.value;
  const fieldValue = formikValue || {};
  const currentValue = fieldValue[rest.value];
  const checked = currentValue !== undefined && currentValue !== false;

  const handleChange = () => {
    if (checked) {
      setFieldValue(name, {
        ...fieldValue,
        [rest.value]: true,
      });
    } else {
      setFieldValue(name, {
        ...fieldValue,
        [rest.value]: false,
      });
    }
  };
  const handleEdit = (e) => {
    setFieldValue(name, {
      ...fieldValue,
      [rest.value]: e.target.value,
    });
  };

  // const [editValue, setEditValue] = useState("");
  // const [isChecked, setChecked] = useState(false);

  // const currentValue = editable
  //   ? { value: rest.value, extra: editValue }
  //   : rest.value;
  // const values = formikValue || [];

  // const handleChange = (_) => {
  //   setChecked(!isChecked);
  //   const index = values.indexOf(currentValue);
  //   if (index === -1) {
  //     values.push(currentValue);
  //     if (ref.current) {
  //       ref.current.focus();
  //     }
  //   } else {
  //     values.splice(index, 1);
  //   }
  //   setFieldValue(name, values);
  // };
  // const handleEdit = (event) => {
  //   setEditValue(event.target.value);
  // };

  return (
    <Box boxShadow="md" rounded="md" p="2pt 2ch" outline="md">
      <Checkbox checked={checked} onChange={handleChange} {...rest}>
        {labelText}
      </Checkbox>
      {editable && checked && (
        <Input
          ref={ref}
          onChange={handleEdit}
          value={currentValue}
          placeholder="Please specify..."
          autoFocus
        />
      )}
    </Box>
  );
};

// export const FormCheckbox: React.FC<FormCheckboxProps> = ({
//   name,
//   checked,
//   editable = false,
//   ...props
// }) => {
//   const { label, value } = props;
//   const labelText = label || value;

//   if (editable) {
//     return (
//       <Box role="group">
//         <Checkbox {...props}>
//           <Text>{labelText}</Text>
//         </Checkbox>
//         <Input visibility="hidden" _groupChecked={{ visibility: "visible" }} />
//       </Box>
//     );
//   }
//   return <Checkbox {...props}>{labelText}</Checkbox>;
// };

export default FormCheckbox;
