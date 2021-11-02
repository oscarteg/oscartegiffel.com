import {getTopTracks} from '../../lib/spotify';
import type {NextApiRequest, NextApiResponse} from 'next';

type Track = {
  artists: Array<Artist>;
  external_urls: {
    spotify: string;
  };
  name: string;
};

type Artist = {
  name: string;
};

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const response = await getTopTracks();
  const {items} = await response.json();

  const tracks = items.slice(0, 10).map((track: Track) => ({
    artist: track.artists.map((artist: Artist) => artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }));

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({tracks});
};
