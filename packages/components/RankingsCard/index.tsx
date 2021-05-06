import { BoxProps, Box, Grid, Text, Badge } from '@chakra-ui/layout';
import {
  Button,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import type { MovieRanking } from '@shopify/types';
import Image from 'next/image';
import { FcRemoveImage } from 'react-icons/fc';
import { RankingsService } from '@shopify/core';
import { getRankingsState } from '@shopify/core/redux/selectors';
import { useSelector } from 'react-redux';

interface RankingsCardProps extends BoxProps {
  children?: React.ReactNode;
  rankings: Array<MovieRanking>;
  loading?: boolean;
  onRefresh?: () => any;
}

export const RankingsCard = ({
  children,
  rankings,
  loading = false,
  ...props
}: RankingsCardProps) => {
  const rankingState = useSelector(getRankingsState);

  useEffect(() => {
    RankingsService.setRankings(rankings);
  }, []);

  // if (loading || rankingState.loading) {
  //   return (
  //     <Skeleton
  //       position='relative'
  //       borderRadius='25px'
  //       overflow='hidden'
  //       py='25px'
  //       {...props}
  //     ></Skeleton>
  //   );
  // }

  return (
    <>
      <Box
        position='relative'
        color='black'
        background='white'
        borderRadius='25px'
        overflow='hidden'
        py='25px'
        {...props}
      >
        <Flex mb='5px' height='50px'>
          <Flex width='85px' justifyContent='center'>
            <Image height='50px' width='50px' src='/rankings.svg' />
          </Flex>

          <Flex flex='1' justifyContent='flex-start' alignItems='center'>
            <Box
              m='2'
              background='#00cd97'
              height='10px'
              width='10px'
              borderRadius='5px'
            />
            <Text color='#00cd97' fontWeight='bold'>
              Global Rankings
            </Text>
          </Flex>

          <Flex mr='3'>
            <Button
              onClick={() => RankingsService.getLatestRankings()}
              disabled={!rankingState.allowRefresh}
              _focus={{ border: 'none' }}
            >
              <Image height='30px' width='30px' src='/refresh.svg' />
            </Button>
          </Flex>
        </Flex>

        {rankingState.movies.map((ranking: MovieRanking, index: number) => (
          <Box key={ranking.imdbID} height='136px' minWidth='100%'>
            <Flex position='relative' height='100%' minWidth='100%'>
              <Flex
                position='absolute'
                height='136px'
                width='85px'
                justifyContent='center'
                alignItems='center'
              >
                {rankingState.loading ? (
                  <SkeletonCircle
                    height='50px'
                    width='50px'
                    startColor='#cbad6d'
                    endColor='#d53369'
                  />
                ) : ranking.Poster !== 'N/A' ? (
                  <Image height='136px' width='85px' src={ranking.Poster} />
                ) : (
                  <FcRemoveImage size={70} />
                )}
              </Flex>

              <Flex
                ml='85px'
                pl='1'
                flexDir='column'
                flex='1'
                justifyContent='center'
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
              >
                {rankingState.loading ? (
                  <SkeletonText
                    mr='5'
                    startColor='#cbad6d'
                    endColor='#d53369'
                  />
                ) : (
                  <>
                    <Text
                      whiteSpace='nowrap'
                      overflow='hidden'
                      textOverflow='ellipsis'
                      fontWeight='800'
                    >
                      #{index + 1} {ranking.Title}
                    </Text>

                    <Flex height='100%' flex='1' width='100%'>
                      <Flex
                        flexDir='column'
                        justifyContent='space-around'
                        alignItems='space-around'
                        width='50%'
                      >
                        <Text
                          whiteSpace='nowrap'
                          overflow='hidden'
                          textOverflow='ellipsis'
                        >
                          {ranking.Year}
                        </Text>

                        <Flex flex='1' alignItems='center'>
                          <Flex width='100%' justifyContent='space-between'>
                            <Badge
                              color='white'
                              bgGradient={PillGradient(ranking.Type)}
                            >
                              {ranking.Type}
                            </Badge>
                          </Flex>
                        </Flex>
                      </Flex>

                      <Grid
                        mr='5'
                        flex='1'
                        justifyContent='flex-end'
                        alignItems='center'
                      >
                        <Flex>
                          <Image height='30px' width='30px' src='/arrow.svg' />

                          <Text m='1' fontWeight='800'>
                            {ranking.votes}
                          </Text>
                        </Flex>
                      </Grid>
                    </Flex>
                  </>
                )}
              </Flex>
            </Flex>
          </Box>
        ))}
      </Box>
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
