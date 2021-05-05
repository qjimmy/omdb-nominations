import { BoxProps, Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import React from 'react';

interface CardProps extends BoxProps {
  children?: React.ReactNode;
}

export const NominationCard = ({ children, ...props }: CardProps) => {
  return (
    <Box
      position='relative'
      background='white'
      borderRadius='25px'
      overflow='hidden'
      py='25px'
      {...props}
    >
      {children}
      <Button
        position='absolute'
        background='red.500'
        height='15%'
        width='100%'
        bottom='0'
        color='white'
        borderRadius='0'
        _hover={{
          background: 'red.600',
        }}
      >
        Clear Nominations
      </Button>
    </Box>
  );
};
