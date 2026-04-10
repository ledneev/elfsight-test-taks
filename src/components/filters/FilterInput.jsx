import { useCallback } from 'react';
import styled from 'styled-components';

export function FilterInput({ placeholder, value, onChange }) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange]);

  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #83bf46;
  background: #263750;
  color: #fff;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  transition: background 0.2s;

  &::placeholder {
    color: #888;
  }

  &:hover,
  &:focus {
    background: #334466;
  }
`;
