import React from 'react';
import {
  Flex,
  Box,
  Text,
  FlexProps,
  Button,
  Badge,
  useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FcRemoveImage } from 'react-icons/fc';
import { NominationService } from '@shopify/core/services';
import { getNominationState } from '@shopify/core/redux/selectors/nominations.selectors';
import { useSelector } from 'react-redux';

interface SearchBoxResultsProps extends FlexProps {
  searchResults: Array<{
    Title: string;
    Year: number;
    Poster: string;
    imdbID: string;
    Type: string;
  }>;
}

export const SearchBoxResults: React.FC<SearchBoxResultsProps> = ({
  searchResults,
  ...props
}) => {
  const alert = useToast();

  const nominations = useSelector(getNominationState);
  const isMaxNominations = Object.keys(nominations).length === 5;

  return (
    <>
      {searchResults.map((searchResult) => {
        const isAlreadyNominated = Object.keys(nominations).includes(
          searchResult.imdbID
        );

        return (
          <Flex
            key={searchResult.imdbID}
            position='relative'
            maxWidth='100%'
            height='120px'
            cursor={!isAlreadyNominated && 'pointer'}
            {...props}
            onClick={() => {
              if (!isAlreadyNominated) {
                props.onClick(null);
                !isMaxNominations
                  ? NominationService.nominate(searchResult)
                  : alert({
                      status: 'error',
                      title: 'Maximum of 5 Nominations only!',
                      description: 'You can only nominate 5 movies at most.',
                      position: 'top',
                      isClosable: true,
                    });
              }
            }}
            _hover={
              isAlreadyNominated
                ? null
                : {
                    background: 'rgb(0, 0, 0, 0.1)',
                  }
            }
          >
            {isAlreadyNominated && (
              <Flex
                flexDir='column'
                position='absolute'
                top='50%'
                left='50%'
                right='0'
                justifyContent='center'
                alignItems='center'
                opacity='1'
                transform='translate(-50%, -50%)'
                zIndex='4'
              >
                <Text
                  p='2'
                  borderRadius='10px'
                  opacity='1'
                  color='black'
                  // bgGradient='linear-gradient(to left, #5C258D, #4389A2)'
                >
                  You already nominated this movie
                </Text>

                <Badge
                  mr='1'
                  cursor='pointer'
                  color='white'
                  bgGradient='linear(to left, #FF416C, #FF4B2B)'
                  onClick={() => NominationService.remove(searchResult.imdbID)}
                >
                  Remove
                </Badge>
              </Flex>
            )}

            <Flex justifyContent='center' alignItems='center' width={90}>
              {searchResult.Poster !== 'N/A' ? (
                <Image src={searchResult.Poster} height={120} width={90} />
              ) : (
                <FcRemoveImage size={70} />
              )}
            </Flex>

            <Flex
              ml={1}
              minWidth='calc(100% - 100px)'
              flexDir='column'
              flex={1}
              alignItems='flex-start'
              style={
                isAlreadyNominated
                  ? {
                      opacity: 0.2,
                      background: 'grey',
                      marginLeft: 1,
                    }
                  : {}
              }
            >
              <Text
                fontWeight='extrabold'
                maxWidth='100%'
                minWidth={0}
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
                padding='5px'
              >
                {searchResult.Title}
              </Text>

              <Text>{searchResult.Year}</Text>

              <Badge color='white' bgGradient={PillGradient(searchResult.Type)}>
                {searchResult.Type}
              </Badge>
            </Flex>
          </Flex>
        );
      })}
    </>
  );
};

const PillGradient = (type: string | 'series' | 'movie') => {
  switch (type) {
    case 'movie':
      return 'linear-gradient(to left, #FC466B, #3F5EFB)';
    case 'series':
      return 'linear-gradient(to left, #134E5E, #71B280)';
    default:
      return 'linear-gradient(to left, #5C258D, #4389A2)';
  }
};
