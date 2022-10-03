import React, { useEffect, useState } from "react";
import cn from "classnames";
import { getNowPlaying } from "../services/spotify";

export type CurrentSong = {
  songUrl: string;
  title: string;
  artist: string;
  albumImageUrl: string;
};

export default function NowPlaying() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    (async () => {
      const response = await getNowPlaying();

      setData(response);
    })();
  }, []);

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-start p-2 mb-8 border border-gray-300 rounded-lg dark:border-gray-800 w-72"
    >
      <span className="absolute top-0 right-0 flex w-3 h-3 -mt-1 -mr-1">
        <span
          className={cn("animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75", {
            "bg-green-400": data?.title,
          })}
        ></span>
        <span
          className={cn("relative inline-flex rounded-full h-3 w-3 bg-red-500", { "bg-green-500": data?.title })}
        ></span>
      </span>
      <img
        alt="Spotify"
        className="w-16 h-16 rounded-lg"
        width={64}
        height={64}
        src={data?.albumImageUrl || "/static/images/placeholder.jpg"}
      />
      <div className="flex flex-col items-start justify-center ml-3">
        <span className="w-48 font-medium text-gray-800 truncate dark:text-gray-200 max-w-48">
          {data?.title ?? "Not Playing"}
        </span>
        <p className="w-48 text-gray-500 truncate dark:text-gray-300 max-w-48">{data?.artist ?? "Spotify"}</p>
      </div>
    </a>
  );
}
