import { useCallback } from 'react';
import styled from 'styled-components';
import { useData } from '../providers';
import { useFilters } from '../../hooks/useFilters';
import { FilterSelect } from './FilterSelect';
import { FilterInput } from './FilterInput';
import { FilterButton } from './FilterButton';

const STATUS_OPTIONS = ['Alive', 'Dead', 'Unknown'];
const GENDER_OPTIONS = ['Male', 'Female', 'Genderless', 'Unknown'];
const SPECIES_OPTIONS = [
  'Human',
  'Alien',
  'Humanoid',
  'Poopybutthole',
  'Mythological Creature',
  'Animal',
  'Robot',
  'Cronenberg',
  'Disease',
  'Unknown'
];

export function Filters() {
  const { setApiURL, setActivePage } = useData();

  const handleApply = useCallback(
    (filters) => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value.toLowerCase());
      });

      setActivePage(0);
      setApiURL(
        `https://rickandmortyapi.com/api/character/?${params.toString()}`
      );
    },
    [setApiURL, setActivePage]
  );

  const { filters, handleChange, applyFilters, resetFilters } = useFilters({
    onApply: handleApply
  });

  const handleStatus = useCallback((v) => handleChange('status', v), [
    handleChange
  ]);
  const handleGender = useCallback((v) => handleChange('gender', v), [
    handleChange
  ]);
  const handleSpecies = useCallback((v) => handleChange('species', v), [
    handleChange
  ]);
  const handleName = useCallback((v) => handleChange('name', v), [
    handleChange
  ]);
  const handleType = useCallback((v) => handleChange('type', v), [
    handleChange
  ]);

  return (
    <FiltersGrid>
      <FilterSelect
        placeholder="Status"
        options={STATUS_OPTIONS}
        value={filters.status}
        onChange={handleStatus}
      />
      <FilterSelect
        placeholder="Gender"
        options={GENDER_OPTIONS}
        value={filters.gender}
        onChange={handleGender}
      />
      <FilterSelect
        placeholder="Species"
        options={SPECIES_OPTIONS}
        value={filters.species}
        onChange={handleSpecies}
      />
      <FilterInput
        placeholder="Name"
        value={filters.name}
        onChange={handleName}
      />
      <FilterInput
        placeholder="Type"
        value={filters.type}
        onChange={handleType}
      />
      <FilterButton onClick={applyFilters} color="#83bf46">
        Apply
      </FilterButton>
      <FilterButton onClick={resetFilters} color="#ff5152">
        Reset
      </FilterButton>
    </FiltersGrid>
  );
}

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;

  & > *:nth-child(1),
  & > *:nth-child(2),
  & > *:nth-child(3) {
    grid-column: span 2;
  }

  & > *:nth-child(4),
  & > *:nth-child(5) {
    grid-column: span 2;
  }

  & > *:nth-child(6),
  & > *:nth-child(7) {
    grid-column: span 1;
  }

  @media (max-width: 530px) {
    grid-template-columns: 1fr;

    & > * {
      grid-column: span 1;
    }
  }
`;
