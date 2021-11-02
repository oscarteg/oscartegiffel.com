import useSWR from 'swr';
import Track from '../components/Track';
import fetcher from '../lib/fetcher';
import Loading from './Loading';
import type {TrackType} from './Track';

export default function TopTracks() {
  const {data} = useSWR<{tracks: Array<TrackType>}>('/api/top-tracks', fetcher);

  if (!data) {
    return <Loading loading={!data} />;
  }

  return data.tracks.map(track => <Track key={track.songUrl} {...track} />);
}
