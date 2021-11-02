export type TrackType = {
  ranking: string;
  songUrl: string;
  title: string;
  artist: string;
};

export default function Track(track: TrackType) {
  return (
    <div className="flex flex-row items-baseline w-full max-w-3xl mt-8 border-b border-gray-100 dark:border-gray-800">
      <p className="text-sm font-bold text-gray-400 dark:text-gray-600">
        {track.ranking}
      </p>
      <div className="flex flex-col pl-3">
        <a
          className="font-medium text-gray-900 truncate dark:text-gray-100 w-60 sm:w-96 md:w-full"
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {track.title}
        </a>
        <p
          className="mb-4 text-gray-500 truncate w-60 sm:w-96 md:w-full"
          color="gray.500"
        >
          {track.artist}
        </p>
      </div>
    </div>
  );
}
