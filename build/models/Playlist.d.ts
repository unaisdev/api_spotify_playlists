import { AddPlaylist, UpdatePlaylist } from "../types";
declare const createPlaylist: (playlist: AddPlaylist) => Promise<{
    id: string;
    playlistId: string;
    trackIds: string[];
    last_update: Date;
    userId: string;
} | undefined>;
declare const getPlaylists: (userId: string) => Promise<{
    id: string;
    playlistId: string;
    trackIds: string[];
    last_update: Date;
    userId: string;
}[] | undefined>;
declare const updatePlaylists: (playlistId: string, playlist: UpdatePlaylist) => Promise<{
    id: string;
    playlistId: string;
    trackIds: string[];
    last_update: Date;
    userId: string;
} | undefined>;
declare const deletePlaylists: (playlistId: string, userId: string) => Promise<import(".prisma/client").Prisma.BatchPayload | undefined>;
declare const isPlaylistAdded: (playlistId: string, userId: string) => Promise<boolean | undefined>;
export { createPlaylist, getPlaylists, updatePlaylists, deletePlaylists, isPlaylistAdded, };
