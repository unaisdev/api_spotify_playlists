"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = exports.ERROR_CODES = void 0;
exports.ERROR_CODES = {
    PLAYLIST_LIMIT_EXCEEDED: "PLAYLIST_LIMIT_EXCEEDED",
    TRACKS_LIMIT_EXCEEDED: "TRACKS_LIMIT_EXCEEDED",
};
exports.ERROR_MESSAGES = {
    [exports.ERROR_CODES.PLAYLIST_LIMIT_EXCEEDED]: "You can only add up to 3 playlists for notifications",
    [exports.ERROR_CODES.TRACKS_LIMIT_EXCEEDED]: "Playlist exceeds the maximum limit of 1000 tracks",
};
