import React, { useRef } from 'react';
import { Box, Flex, Input, InputProps, Spinner, Text } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { SearchBarService } from '@shopify/core';
import { useSelector } from 'react-redux';
import { getSearchState } from '../../core/redux/selectors';
import { SearchStatus } from '@shopify/types';
import { SearchResultsWrapper } from './SearchResultsWrapper';
import { SearchBoxResults } from './SearchBoxResults';

interface OmdbSearchbarProps extends InputProps {
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OmdbSearchbar: React.FC<OmdbSearchbarProps> = ({
  focused,
  setFocused,
  ...props
}) => {
  const searchBox = useRef(null);

  const search = useSelector(getSearchState);

  return (
    <Box {...props}>
      <Flex position='relative' background='white' borderRadius='0.375rem'>
        <Flex
          placeItems='center'
          px='15px'
          height='50px'
          borderRadius='10px'
          borderRight='solid 1px black'
          cursor='pointer'
          onClick={() => searchBox.current.focus()}
        >
          <AiOutlineSearch color='black' />
        </Flex>

        <Input
          background='white'
          color='black'
          width='100%'
          placeholder='"Demon Slayer the Movie: Mugen Train"'
          _placeholder={{
            color: 'black',
          }}
          ref={searchBox}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            SearchBarService.search(event.target.value)
          }
        />
      </Flex>

      {focused && (
        <>
          {search.results?.Search &&
            search.query.length > 2 &&
            search.status === '' && (
              <SearchResultsWrapper>
                <SearchBoxResults
                  searchResults={search.results?.Search}
                  onClick={() => setFocused(false)}
                />
              </SearchResultsWrapper>
            )}

          {search.status === SearchStatus.LongerQueryRequired &&
            !!search.query.length && (
              <SearchResultsWrapper>
                <Flex
                  justifyContent='center'
                  alignItems='center'
                  maxWidth='100%'
                  zIndex={4}
                  height='50px'
                  _hover={{
                    background: 'rgb(0, 0, 0, 0.1)',
                  }}
                >
                  <Text>{SearchStatus.LongerQueryRequired}</Text>
                </Flex>
              </SearchResultsWrapper>
            )}

          {search.status === SearchStatus.Debouncing && (
            <SearchResultsWrapper>
              <Flex
                justifyContent='center'
                alignItems='center'
                maxWidth='100%'
                zIndex={4}
                height='50px'
                _hover={{
                  background: 'rgb(0, 0, 0, 0.1)',
                }}
              >
                {SearchStatus.Debouncing}
              </Flex>
            </SearchResultsWrapper>
          )}

          {search.loading && search.status === SearchStatus.Fetching && (
            <SearchResultsWrapper
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <Spinner size='xl' />
            </SearchResultsWrapper>
          )}
        </>
      )}
    </Box>
  );
};
