import fetcher from '@/lib/fetcher';
import cn from 'classnames';
import useSWR from 'swr';

export default function NowPlaying() {
  const { data } = useSWR('/api/now-playing', fetcher);

  return (
    <a
      href={data?.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start border border-gray-300 dark:border-gray-800 rounded-lg w-72 p-2 mb-8 relative"
    >
      <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
        <span
          className={cn(
            'animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75',
            { 'bg-green-400': data?.title }
          )}
        ></span>
        <span
          className={cn(
            'relative inline-flex rounded-full h-3 w-3 bg-red-500',
            { 'bg-green-500': data?.title }
          )}
        ></span>
      </span>
      <img
        alt="Spotify"
        className="rounded-lg w-16 h-16"
        // height={60}
        // width={60}
        src={data?.albumImageUrl || '/static/images/placeholder.jpg'}
      />
      <div className="flex flex-col justify-center items-start ml-3">
        <span className="text-gray-800 dark:text-gray-200 font-medium max-w-48 truncate w-48">
          {data?.title ?? 'Not Playing'}
        </span>
        <p className="text-gray-500 dark:text-gray-300 max-w-48 truncate w-48">
          {data?.artist ?? 'Spotify'}
        </p>
      </div>
    </a>
  );
}
