import fetcher from "./fetcher";

const { SPOTIFY_BASIC: basic, SPOTIFY_REFRESH_TOKEN: refresh_token } = import.meta.env;

const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export async function getAccessToken() {
  return fetcher(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken();

  return fetcher(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export async function getTopTracks() {
  const { access_token } = await getAccessToken();

  const params = new URLSearchParams({
    time_range: "medium_term",
    limit: "10",
  });

  return fetcher(`${TOP_TRACKS_ENDPOINT}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export async function fetchTopTracks() {
  const { items } = await getTopTracks();

  return items.map((track: Record<string, any>) => ({
    artist: track.artists.map((artist: any) => artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }));
}
