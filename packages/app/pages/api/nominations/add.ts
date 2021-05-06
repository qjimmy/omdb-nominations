import { MovieMetadata } from '@shopify/types';
import { Http } from '@shopify/types/api/http';
import { Collections } from '@shopify/utils';
import { admin } from '@shopify/utils/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== Http.Methods.PUT) {
    res.status(405).send('Unsupported Method');
  }

  const nominee: MovieMetadata = req.body;
  const rankingsRef = admin.firestore().collection(Collections.Rankings);

  try {
    const result = await admin.firestore().runTransaction(async () => {
      const nomineeRef = rankingsRef.doc(nominee.imdbID);

      const nomineeDoc = await nomineeRef.get();

      if (nomineeDoc.exists) {
        const increment = admin.firestore.FieldValue.increment(1);
        return await nomineeRef.update({ votes: increment });
      } else {
        return await rankingsRef
          .doc(nominee.imdbID)
          .set({ ...nominee, votes: 1 });
      }
    });

    res.status(200).send({ ...result });
  } catch (error) {
    res.status(400).send({ ...error });
  }
};
