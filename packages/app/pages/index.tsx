import React from 'react';
import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { OmdbSearchbar } from '@shopify/components';

export default function Home() {
  return (
    <>
      <Head>
        <title>OMDB Nominations</title>
        <meta
          name='Nominate your favorite movies and make a change!'
          content='Created by QJ'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Flex justifyContent='center' width='100%'>
        <OmdbSearchbar mt={['5%']} width={['100%', '80%', '50%']} />
      </Flex>
    </>
  );
}
