import React, { useRef, useState } from 'react';
import { Box, Flex, Input, InputProps, Spinner, Text } from '@chakra-ui/react';
import { Backdrop } from '@shopify/components';
import { AiOutlineSearch } from 'react-icons/ai';
import { SearchBarService } from '@shopify/core';
import { useSelector } from 'react-redux';
import { getNominationState, getSearchState } from '../../core/redux/selectors';
import { SearchStatus } from '@shopify/types';
import { SearchResultsWrapper } from './SearchResultsWrapper';
import { SearchBoxResults } from './SearchBoxResults';

interface OmdbSearchbarProps extends InputProps {}

export const OmdbSearchbar: React.FC<OmdbSearchbarProps> = ({ ...props }) => {
  const searchBox = useRef(null);

  const search = useSelector(getSearchState);

  const [focused, setFocused] = useState(false);

  return (
    <Box {...props}>
      {focused && <Backdrop onClick={() => setFocused(false)} />}

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
          ref={searchBox}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            SearchBarService.search(event.target.value)
          }
          onFocus={() => setFocused(true)}
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

          {search.loading && (
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
