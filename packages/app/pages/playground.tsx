import React from 'react';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Flex, useDisclosure, Button } from '@chakra-ui/react';
import * as Component from '@shopify/components';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Component Dev Playground</title>
        <meta
          name='Nominate your favorite movies and make a change!'
          content='Created by @qjimmy'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>playground</div>
      <Link href='/'>Home</Link>

      <Flex justifyContent='center' width='100%'>
        <Component.NominationCard width='500px' height='600px' />
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  if (process.env.NODE_ENV !== 'development')
    res.writeHead(403, { Location: '/' });
  return {
    props: {},
  };
};

export default Home;
