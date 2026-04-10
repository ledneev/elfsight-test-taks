import styled from 'styled-components';
import { Logo } from './Logo';
import { Filters } from '../filters/Filters';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filters />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 950px) {
    flex-direction: column;
    align-items: center;
  }
`;
