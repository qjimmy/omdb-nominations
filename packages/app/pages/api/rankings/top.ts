import { MovieMetadata } from '@shopify/types';
import { Http } from '@shopify/types/api/http';
import { Collections, MAX_NOMINATIONS } from '@shopify/utils';
import { admin } from '@shopify/utils/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== Http.Methods.GET) {
    res.status(405).send('Unsupported Method');
  }

  try {
    const rankingsCollection = await admin
      .firestore()
      .collection(Collections.Rankings)
      .orderBy('votes', 'desc')
      .limit(MAX_NOMINATIONS)
      .get();

    const rankings = rankingsCollection.docs.map((nominee) => ({
      ...nominee.data(),
    }));

    res.status(200).send(rankings);
  } catch (error) {
    res.status(400).send({ ...error });
  }
};
