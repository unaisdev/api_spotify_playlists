import { AddPlaylist, UpdatePlaylist } from "../types";
declare const createPlaylist: (playlist: AddPlaylist) => Promise<(import("@prisma/client/runtime").GetResult<{
    id: string;
    playlistId: string;
    trackIds: string[];
    last_update: Date;
    userId: string;
}, unknown> & {}) | undefined>;
declare const getPlaylists: (userId: string) => Promise<(import("@prisma/client/runtime").GetResult<{
    id: string;
    playlistId: string;
    trackIds: string[];
    last_update: Date;
    userId: string;
}, unknown> & {})[] | undefined>;
declare const updatePlaylists: (playlistId: string, playlist: UpdatePlaylist) => Promise<(import("@prisma/client/runtime").GetResult<{
    id: string;
    playlistId: string;
    trackIds: string[];
    last_update: Date;
    userId: string;
}, unknown> & {}) | undefined>;
declare const deletePlaylists: (playlistId: string, userId: string) => Promise<import(".prisma/client").Prisma.BatchPayload | undefined>;
declare const isPlaylistAdded: (playlistId: string, userId: string) => Promise<boolean | undefined>;
export { createPlaylist, getPlaylists, updatePlaylists, deletePlaylists, isPlaylistAdded, };
