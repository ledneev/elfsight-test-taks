import { ReactComponent as Male } from '../../assets/genders/male.svg';
import { ReactComponent as Female } from '../../assets/genders/female.svg';
import { ReactComponent as Genderless } from '../../assets/genders/genderless.svg';
import {
  CardTitleContainer,
  StyledCardTitle,
  IconContainer
} from './Card.styles';

const GENDER_ICONS = {
  Male: <Male width={20} height={20} fill="#33b3c8" title="Male" />,
  Female: <Female width={24} height={24} fill="pink" title="Female" />,
  Genderless: (
    <Genderless width={24} height={24} fill="#999" title="Genderless" />
  ),
  unknown: <Genderless width={24} height={24} fill="#999" title="Genderless" />
};

export function CardTitle({ name, gender, className }) {
  return (
    <CardTitleContainer className={className}>
      <StyledCardTitle className="card-title">{name}</StyledCardTitle>
      <IconContainer>{GENDER_ICONS[gender] ?? null}</IconContainer>
    </CardTitleContainer>
  );
}
