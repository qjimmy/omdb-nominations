import { HttpService } from '@shopify/core/services';
import { OMDB_ENDPOINT } from '@shopify/types/api/omdb';

import { Http } from '@shopify/types/api/http';
import type { IOmdbSearchResults } from '@shopify/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== Http.Methods.GET) {
    res.status(405).send('Unsupported Method');
  }

  const { query } = req.query;

  try {
    const searchResults = await HttpService.get<IOmdbSearchResults>(
      OMDB_ENDPOINT,
      {
        query: {
          apikey: process.env.OMDB_API_KEY,
          s: query as string,
        },
      }
    );

    if (searchResults.Response === 'False') {
      throw { code: 'omdb-error', message: searchResults.Error };
    }

    res.status(200).send({ searchResults });
  } catch (error) {
    res.status(400).send(error);
  }
};
