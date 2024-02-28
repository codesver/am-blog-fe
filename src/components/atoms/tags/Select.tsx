import React from "react";
import styled from "styled-components";
import { Theme, useTheme } from "../../../resources/Theme";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  options: Option[];
  placeholder: string;
  onChange: (value: string) => void;
}

const Select = ({ value, options, placeholder, onChange }: SelectProps) => {
  const theme = useTheme((state) => state.theme);

  return (
    <SelectContainer
      $theme={theme}
      onChange={(e) => onChange(e.target.value)}
      {...{
        value,
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectContainer>
  );
};

export default React.memo(Select);

interface SelectContainerProps {
  $theme: Theme;
}

const SelectContainer = styled.select<SelectContainerProps>`
  padding: 5px;

  border: 1px solid ${({ $theme }) => $theme.colors.unbase};
  border-radius: 5px;
  background-color: ${({ $theme }) => $theme.colors.base};
  color: ${({ $theme }) => $theme.colors.unbase};
`;
