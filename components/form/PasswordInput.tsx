import { IconButton } from "@chakra-ui/button";
import {
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/input";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordInputProps extends InputGroupProps {
  inputProps: Omit<InputProps, "type">;
  leftElement?: React.ReactElement;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  inputProps,
  leftElement,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  return (
    <InputGroup {...props} role="group">
      {leftElement && (
        <InputLeftElement color="gray.500">{leftElement}</InputLeftElement>
      )}
      <Input pr="1ch" {...inputProps} type={show ? "text" : "password"} />
      <InputRightElement
        _groupHover={{ visibility: "visible" }}
        visibility={"hidden"}
      >
        <IconButton
          size="sm"
          onClick={toggleShow}
          aria-label="toggle show password"
          variant="ghost"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </IconButton>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
