import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

interface SearchResultsWrapper extends BoxProps {
  children?: React.ReactNode;
}

export const SearchResultsWrapper = ({
  children,
  ...props
}: SearchResultsWrapper) => (
  <Box
    mt={1}
    py='5px'
    position='relative'
    width='100%'
    background='white'
    color='black'
    borderRadius='5px'
    {...props}
  >
    {children}
  </Box>
);
