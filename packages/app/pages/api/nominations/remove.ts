import { MovieMetadata } from '@shopify/types';
import { Http } from '@shopify/types/api/http';
import { Collections } from '@shopify/utils';
import { admin } from '@shopify/utils/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== Http.Methods.PUT) {
    res.status(405).send('Unsupported Method');
  }

  const { imdbID } = req.body;
  const rankingsRef = admin.firestore().collection(Collections.Rankings);

  console.log(req.body);

  try {
    const nomineeRef = rankingsRef.doc(imdbID);
    const decrement = admin.firestore.FieldValue.increment(-1);

    const writeResult = await nomineeRef.update({ votes: decrement });

    res.status(200).send({ ...writeResult });
  } catch (error) {
    res.status(400).send({ ...error });
  }
};
