import styled from 'styled-components';

export function FilterButton({ children, onClick, color }) {
  return (
    <StyledButton onClick={onClick} color={color}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 100%;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid ${({ color }) => color};
  background: transparent;
  color: ${({ color }) => color};
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: ${({ color }) => color};
    color: #fff;
  }
`;
