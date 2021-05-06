import { MovieMetadata } from '@shopify/types';
import { Http } from '@shopify/types/api/http';
import { Collections } from '@shopify/utils';
import { admin } from '@shopify/utils/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== Http.Methods.PUT) {
    res.status(405).send('Unsupported Method');
  }

  const list: Array<string> = req.body;
  const rankingsRef = admin.firestore().collection(Collections.Rankings);

  const batch = admin.firestore().batch();
  const decrement = admin.firestore.FieldValue.increment(-1);

  list.forEach((id: string) => {
    batch.update(rankingsRef.doc(id), { votes: decrement });
  });

  try {
    const commitResult = await batch.commit();

    res.status(200).send({ ...commitResult });
  } catch (error) {
    res.status(400).send({ ...error });
  }
};
