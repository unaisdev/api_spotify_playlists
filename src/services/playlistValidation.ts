import { ERROR_CODES, ERROR_MESSAGES } from "../constants/errors";
import { getPlaylists } from "../models/Playlist";
import { CustomError } from "../types/playlist";

export class PlaylistValidationService {
  static async validatePlaylistAddition(
    userId: string,
    tracks: any[]
  ): Promise<void | CustomError> {
    const existingPlaylists = await getPlaylists(userId);

    if (existingPlaylists && existingPlaylists.length >= 3) {
      return {
        code: ERROR_CODES.PLAYLIST_LIMIT_EXCEEDED,
        message: ERROR_MESSAGES[ERROR_CODES.PLAYLIST_LIMIT_EXCEEDED],
      };
    }

    if (tracks.length > 1000) {
      return {
        code: ERROR_CODES.TRACKS_LIMIT_EXCEEDED,
        message: ERROR_MESSAGES[ERROR_CODES.TRACKS_LIMIT_EXCEEDED],
      };
    }
  }
}
