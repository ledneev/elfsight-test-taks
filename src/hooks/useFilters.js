import { useCallback, useState } from 'react';

const DEFAULT_FILTERS = {
  status: '',
  gender: '',
  species: '',
  name: '',
  type: ''
};

export function useFilters({ onApply }) {
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);

    return {
      status: params.get('status') || '',
      gender: params.get('gender') || '',
      species: params.get('species') || '',
      name: params.get('name') || '',
      type: params.get('type') || ''
    };
  });

  const handleChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    window.history.pushState({}, '', `?${params.toString()}`);
    onApply(filters);
  }, [filters, onApply]);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    window.history.pushState({}, '', window.location.pathname);
    onApply(DEFAULT_FILTERS);
  }, [onApply]);

  return { filters, handleChange, applyFilters, resetFilters };
}
