import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { Loader, Text } from '../common';

const API_EPISODES_URL = 'https://rickandmortyapi.com/api/episode';

export function PopupEpisodes({ episodes }) {
  const [series, setSeries] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!episodes?.length) {
      setIsFetching(false);

      return;
    }

    setIsFetching(true);

    const controller = new AbortController();

    const episodesIds = episodes.map((ep) => ep.match(/\d+$/)[0]);

    axios
      .get(`${API_EPISODES_URL}/${episodesIds.join(',')}`, {
        signal: controller.signal
      })
      .then(({ data }) => {
        setSeries(Array.isArray(data) ? data : [data]);
        setIsFetching(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        console.error(e);
        setIsFetching(false);
      });

    return () => controller.abort();
  }, [episodes]);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <PopupEpisodesContainer>
      <Text>Participated in episodes:</Text>

      <StyledPopupEpisodes _length={series.length}>
        {series?.map(({ id, name, episode }) => (
          <Episode key={id}>
            <EpisodeMarking>
              {episode
                .replace(/S0?(\d+)/, 'Season $1 - ')
                .replace(/E0?(\d+)/, 'Ep. $1')}
            </EpisodeMarking>
            {name}
          </Episode>
        ))}
      </StyledPopupEpisodes>
    </PopupEpisodesContainer>
  );
}

const PopupEpisodesContainer = styled.div``;
const StyledPopupEpisodes = styled.div`
  display: flex;
  flex-direction: column;

  ${({ _length }) =>
    _length > 20 &&
    css`
      @media (min-width: 600px) {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(
          ${({ _length }) => Math.ceil(_length / 2)},
          1fr
        );

        & p {
          width: 95%;
          border-bottom: 2px solid #eee;
        }
      }
    `}
`;

const Episode = styled.p`
  width: 100%;
  display: grid;
  align-items: center;
  padding: 10px 0;
`;

const EpisodeMarking = styled.span`
  margin-bottom: 8px;
  color: #83bf46;
`;
