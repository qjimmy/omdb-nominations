import { BoxProps, Box, Grid, Text, Badge } from '@chakra-ui/layout';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Modal } from '@shopify/components/Modal';
import { useSelector } from 'react-redux';
import { getNominationList } from '@shopify/core/redux/selectors';
import { MovieMetadata } from '@shopify/types';
import Image from 'next/image';
import { NominationService } from '@shopify/core';
import { FcRemoveImage } from 'react-icons/fc';

interface CardProps extends BoxProps {
  children?: React.ReactNode;
}

export const NominationCard = ({ children, ...props }: CardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nominations = useSelector(getNominationList);

  return (
    <>
      <Modal title='Attention!' isOpen={isOpen} onClose={onClose}>
        This will clear all your nominations. Are you sure?
      </Modal>

      <Box
        position='relative'
        color='black'
        background='white'
        borderRadius='25px'
        overflow='hidden'
        py='25px'
        {...props}
      >
        <Grid
          mb='5px'
          height='50px'
          gridTemplateColumns='1fr 3fr'
          alignItems='center'
        >
          <Flex justifyContent='center'>
            <Image height='50px' width='50px' src='/nomination.svg' />
          </Flex>
          <Text fontWeight='bold'>My Nominations</Text>
        </Grid>

        {nominations.map((nomination: MovieMetadata) => (
          <Box key={nomination.imdbID} height='117px' minWidth='100%'>
            <Flex position='relative' height='100%' minWidth='100%'>
              <Flex
                position='absolute'
                height='117px'
                width='85px'
                justifyContent='center'
                alignItems='center'
              >
                {nomination.Poster !== 'N/A' ? (
                  <Image height='117px' width='85px' src={nomination.Poster} />
                ) : (
                  <FcRemoveImage size={70} />
                )}
              </Flex>

              <Flex
                ml='85px'
                pl='1'
                flexDir='column'
                flex='1'
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
              >
                <Text
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                  fontWeight='800'
                >
                  {nomination.Title}
                </Text>

                <Text
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                >
                  {nomination.Year}
                </Text>

                <Flex flex='1' alignItems='center'>
                  <Flex width='100%' justifyContent='space-between'>
                    <Badge
                      color='white'
                      bgGradient={PillGradient(nomination.Type)}
                    >
                      {nomination.Type}
                    </Badge>

                    <Badge
                      mr='1'
                      color='white'
                      cursor='pointer'
                      bgGradient='linear(to left, #FF416C, #FF4B2B)'
                      onClick={() =>
                        NominationService.remove(nomination.imdbID)
                      }
                    >
                      Remove
                    </Badge>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        ))}

        <Button
          position='absolute'
          background='red.500'
          height='85px'
          width='100%'
          left='0'
          bottom='0'
          color='white'
          borderRadius='0'
          onClick={onOpen}
          disabled={!nominations.length}
          _hover={{
            background: 'red.600',
          }}
        >
          Clear Nominations
        </Button>
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
