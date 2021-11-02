export interface TrackObjectFull extends TrackObjectSimplified {
  /**
   * The album on which the track appears.
   */
  album: AlbumObjectSimplified;
  /**
   * Known external IDs for the track.
   */
  external_ids: ExternalIdObject;
  /**
   * The popularity of the track. The value will be between `0` and `100`, with `100` being the most popular.
   * The popularity of a track is a value between `0` and `100`, with `100` being the most popular.
   * The popularity is calculated by algorithm and is based, in the most part,
   * on the total number of plays the track has had and how recent those plays are.
   */
  popularity: number;
  /**
   * Whether or not the track is from a local file.
   */
  is_local?: boolean | undefined;
}

/**
 * Simplified Track Object
 * [track object (simplified)](https://developer.spotify.com/web-api/object-model/#track-object-simplified)
 */
interface TrackObjectSimplified {
  /**
   * The artists who performed the track.
   */
  artists: ArtistObjectSimplified[];
  /**
   * A list of the countries in which the track can be played,
   * identified by their [ISO 3166-1 alpha-2 code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
   */
  available_markets?: string[] | undefined;
  /**
   * The disc number (usually `1` unless the album consists of more than one disc).
   */
  disc_number: number;
  /**
   * The track length in milliseconds.
   */
  duration_ms: number;
  /**
   * Whether or not the track has explicit lyrics (`true` = yes it does; `false` = no it does not OR unknown).
   */
  explicit: boolean;
  /**
   * Known external URLs for this track.
   */
  external_urls: ExternalUrlObject;
  /**
   * A link to the Web API endpoint providing full details of the track.
   */
  href: string;
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  id: string;
  /**
   * Part of the response when [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/) is applied.
   * If `true`, the track is playable in the given market. Otherwise, `false`.
   */
  is_playable?: boolean | undefined;
  /**
   * Part of the response when [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/) is applied,
   * and the requested track has been replaced with different track.
   * The track in the `linked_from` object contains information about the originally requested track.
   */
  linked_from?: TrackLinkObject | undefined;
  /**
   * Part of the response when [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/) is applied,
   * the original track is not available in the given market, and Spotify did not have any tracks to relink it with.
   * The track response will still contain metadata for the original track, and a restrictions object containing the reason
   * why the track is not available: `"restrictions" : {"reason" : "market"}`.
   */
  restrictions?: RestrictionsObject | undefined;
  /**
   * The name of the track.
   */
  name: string;
  /**
   * A link to a 30 second preview (MP3 format) of the track. Can be null
   */
  preview_url: string | null;
  /**
   * The number of the track. If an album has several discs, the track number is the number on the specified disc.
   */
  track_number: number;
  /**
   * The object type: “track”.
   */
  type: 'track';
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  uri: string;
}
