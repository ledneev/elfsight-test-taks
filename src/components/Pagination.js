import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useData } from './providers';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const { apiURL, info, activePage, setActivePage, setApiURL } = useData();

  const lastIndex = pages.length - 1;

  const pageClickHandler = useCallback(
    (index) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActivePage(index);
      setApiURL(pages[index]);
    },
    [pages, setActivePage, setApiURL]
  );

  const handleFirstClick = useCallback(() => pageClickHandler(0), [
    pageClickHandler
  ]);
  const handlePrevClick = useCallback(() => pageClickHandler(activePage - 1), [
    pageClickHandler,
    activePage
  ]);
  const handleNextClick = useCallback(() => pageClickHandler(activePage + 1), [
    pageClickHandler,
    activePage
  ]);
  const handleLastClick = useCallback(() => pageClickHandler(lastIndex), [
    pageClickHandler,
    lastIndex
  ]);

  useEffect(() => {
    const createdPages = Array.from({ length: info.pages }, (_, i) => {
      const URLWithPage = new URL(apiURL);
      URLWithPage.searchParams.set('page', i + 1);

      return URLWithPage;
    });

    setPages(createdPages);
  }, [info, apiURL]);

  if (pages.length <= 1) return null;

  const hasPrev = activePage > 0;
  const hasNext = activePage < lastIndex;

  return (
    <StyledPagination>
      {hasPrev && (
        <>
          {activePage > 1 && (
            <>
              <Page onClick={handleFirstClick}>« First</Page>
              <Ellipsis>...</Ellipsis>
            </>
          )}
          <Page onClick={handlePrevClick}>{activePage}</Page>
        </>
      )}

      <Page active>{activePage + 1}</Page>

      {hasNext && (
        <>
          <Page onClick={handleNextClick}>{activePage + 2}</Page>

          {activePage < lastIndex - 1 && (
            <>
              <Ellipsis>...</Ellipsis>
              <Page onClick={handleLastClick}>Last »</Page>
            </>
          )}
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
