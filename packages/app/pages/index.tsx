import React, { useEffect, useState } from 'react';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import {
  Backdrop,
  NominationCard,
  OmdbSearchbar,
  RankingsCard,
} from '@shopify/components';
import { useRouter } from 'next/router';
import { store } from '@shopify/core/redux';
import { SetNomination } from '@shopify/core/redux/actions';
import { LocalStorageService } from '@shopify/core/services';
import { MovieMetadata, MovieRanking } from '@shopify/types';
import { admin } from '@shopify/utils/server';
import { Collections, MAX_NOMINATIONS } from '@shopify/utils';

const Homepage: NextPage<{ rankings: Array<MovieRanking> }> = ({
  rankings,
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const { isFallback } = useRouter();

  useEffect(() => {
    store.dispatch(
      new SetNomination(
        LocalStorageService.getNominations<{ [key: string]: MovieMetadata }>()
      )
    );
  }, []);

  return (
    <>
      <Head>
        <title>OMDB Nominations</title>
        <meta
          name='OMDB Nominations. Nominate your favorite movies and make a change.'
          content='Created by QJ'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Flex
          flexDir='column'
          position='relative'
          justifyContent='center'
          alignItems='center'
          height='100%'
          width='100%'
        >
          {focused && <Backdrop zIndex='1' onClick={() => setFocused(false)} />}
          <Box width='100%' height='100px' mb='50px'>
            <OmdbSearchbar
              position='absolute'
              top='10'
              left='50%'
              transform='translate(-50%)'
              zIndex='1'
              width={['100%', '80%', '65%']}
              focused={focused}
              setFocused={setFocused}
              onFocus={() => setFocused(true)}
            />
          </Box>

          <Grid
            flex='1'
            width='100%'
            placeItems='center'
            gridTemplateColumns='repeat(auto-fit, minmax(400px, 1fr))'
            gap={['3', '2', '1']}
          >
            <NominationCard
              maxWidth={[, '555px', , '70%']}
              width={['100%', '90%', '80%']}
              height='750px'
              mb='50px'
            />
            <RankingsCard
              loading={isFallback}
              rankings={rankings}
              maxWidth={[, '555px', , '70%']}
              width={['100%', '90%', '80%']}
              height='750px'
              mb='50px'
            />
          </Grid>
        </Flex>
      </main>
    </>
  );
};

export default Homepage;

export const getStaticProps: GetStaticProps = async (
  _ctx: GetStaticPropsContext
) => {
  const rankingsCollection = await admin
    .firestore()
    .collection(Collections.Rankings)
    .orderBy('votes', 'desc')
    .limit(MAX_NOMINATIONS)
    .get();

  const rankings = rankingsCollection.docs.map((nominee) => ({
    ...nominee.data(),
  }));

  return {
    props: {
      rankings,
    },
    revalidate: 3,
  };
};
