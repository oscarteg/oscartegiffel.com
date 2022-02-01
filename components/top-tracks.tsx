import useSWR from 'swr';
import Track from '../components/track';
import fetcher from '../lib/fetcher';
import Loading from './loading';
import type {TrackType} from '../components/track';

export default function TopTracks() {
  const {data} = useSWR<{tracks: Array<TrackType>}>('/api/top-tracks', fetcher);

  if (!data) {
    return <Loading loading={!data} />;
  }

  return (
    <div>
      {data.tracks.map(track => (
        <Track key={track.songUrl} {...track} />
      ))}
    </div>
  );
}
