import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface BackdropProps extends BoxProps {}

export const Backdrop = ({ ...props }: BackdropProps) => (
  <Box
    id='backdrop'
    position='absolute'
    background='#1a202c'
    filter='blur(4px)'
    opacity='0.7'
    top={0}
    left={0}
    width='100vw'
    height='100vh'
    zIndex='0'
    style={{
      backdropFilter: 'blur(10px)',
    }}
    {...props}
  />
);
