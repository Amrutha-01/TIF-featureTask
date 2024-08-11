import React from "react";
import { useTheme } from "@chakra-ui/react";
import FromWrapper from "./FormWrapper";
import { IFormInputProps } from "@src/interface/forms";
import ReactSelect, { Props } from "react-select";
import { relative } from "path";
import { useEffect, useState } from "react";

interface IFormSelectProps
  extends Omit<IFormInputProps, "inputProps" | "type" | "onChange" | "onBlur"> {
  options: { label: string; value: string }[] | any;
  selectProps?: Props;
  onChange?: any;
  onBlur?: any;
}

const FormSelect: React.FC<IFormSelectProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  selectProps = {},
  children,
  helperText,
  wrapperProps = {},
  options,
}) => {
  const theme = useTheme();
  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      setMenuPortalTarget(document.body);
    }
  }, []);
  const handleChange = (selectedOption: any) => {
    onChange && onChange(name, selectedOption?.label);
  };
  const handleBlur = () => {
    onBlur && onBlur(name, true);
  };

  // Find the selected option object based on the current value
  const selectedOption = options.find(
    (option: any) => option.value === value
  ) || {
    label: value,
    value,
  };

  return (
    <FromWrapper
      isInvalid={Boolean(error && touched)}
      wrapperProps={wrapperProps}
      helperText={helperText}
      label={label}
      error={error as string}
      touched={touched}
    >
      <ReactSelect
        name={name}
        placeholder={placeholder}
        value={selectedOption}
        onChange={handleChange}
        onBlur={handleBlur}
        menuPortalTarget={menuPortalTarget}
        options={options}
        // styles
        styles={{
          container: (base) => ({
            ...base,
            width: "100%",
            minWidth: "none",
            height: "auto",
            maxHeight: "none",
            minHeight: "none",
          }),
          control: (base, { isFocused }) => ({
            ...base,
            width: "100%",
            minWidth: "272px",
            height: "45px",
            border: isFocused
              ? `1px solid ${theme.colors.primary}`
              : error
              ? `1px solid ${theme.colors.errorRed}`
              : "1px solid #c0bcd7",
            backgroundColor: theme.colors.inputBg,
            borderRadius: "10px",
            fontSize: ".875rem",
            fontWeight: "500",
            position: "relative",
            "&:hover": {
              border: `1px solid ${theme.colors.primary}`,
            },
            marginTop: "0px",
          }),
          valueContainer: (base) => ({
            ...base,
            paddingLeft: "20px",
          }),
          option: (base, { isFocused }) => ({
            ...base,
            fontSize: ".875rem",
            fontWeight: "500",
          }),
        }}
        {...selectProps}
      />
      {children}
    </FromWrapper>
  );
};

export default FormSelect;
