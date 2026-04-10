import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

export function FilterSelect({ placeholder, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleSelect = useCallback(
    (option) => {
      onChange(option);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleSelectOption = useCallback(
    (option) => () => {
      handleSelect(option);
    },
    [handleSelect]
  );

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      onChange('');
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <Container ref={ref}>
      <SelectInput onClick={handleToggle} isOpen={isOpen} hasValue={!!value}>
        <SelectValue hasValue={!!value}>{value || placeholder}</SelectValue>
        {value ? (
          <Icon onClick={handleClear}>✕</Icon>
        ) : (
          <Icon isOpen={isOpen}>⌄</Icon>
        )}
      </SelectInput>

      {isOpen && (
        <OptionsList>
          {options.map((option) => (
            <Option
              key={option}
              onClick={handleSelectOption(option)}
              isSelected={option === value}
            >
              {option}
            </Option>
          ))}
        </OptionsList>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const SelectInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #83bf46;
  background: #263750;
  cursor: pointer;
  transition: background 0.2s;
  user-select: none;

  &:hover {
    background: #334466;
  }

  ${({ isOpen }) => isOpen && `background: #2f4363;`}
`;

const SelectValue = styled.span`
  color: ${({ hasValue }) => (hasValue ? '#fff' : '#888')};
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Icon = styled.span`
  color: ${({ isOpen }) => (isOpen ? '#83bf46' : '#888')};
  font-size: 14px;
  margin-left: 8px;
  transition: color 0.2s;
  flex-shrink: 0;

  &:hover {
    color: #83bf46;
  }
`;

const OptionsList = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #444c5e;
  border-radius: 8px;
  z-index: 100;
  max-height: 210px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #444c5e;
    border-radius: 2px;
  }
`;

const Option = styled.div`
  padding: 10px 16px;
  color: #1a1a1a;
  font-size: 15px;
  cursor: pointer;
  font-weight: ${({ isSelected }) => (isSelected ? '700' : '400')};
  transition: background 0.2s;

  &:hover {
    background: #83bf461a;
  }
`;
