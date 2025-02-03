import { ERROR_CODES } from "../constants/errors";

export interface PlaylistTrack {
  track?: {
    id: string;
  };
}

export interface PlaylistData {
  id: string;
  playlistId: string;
  userId: string;
  trackIds: string[];
  last_update: Date;
}

export interface CustomError {
  code: keyof typeof ERROR_CODES;
  message: string;
}
