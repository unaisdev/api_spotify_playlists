export const ERROR_CODES = {
  PLAYLIST_LIMIT_EXCEEDED: "PLAYLIST_LIMIT_EXCEEDED",
  TRACKS_LIMIT_EXCEEDED: "TRACKS_LIMIT_EXCEEDED",
} as const;

export const ERROR_MESSAGES = {
  [ERROR_CODES.PLAYLIST_LIMIT_EXCEEDED]:
    "You can only add up to 3 playlists for notifications",
  [ERROR_CODES.TRACKS_LIMIT_EXCEEDED]:
    "Playlist exceeds the maximum limit of 1000 tracks",
} as const;
