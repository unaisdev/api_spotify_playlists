"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlaylistAdded = exports.deletePlaylists = exports.updatePlaylists = exports.getPlaylists = exports.createPlaylist = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPlaylist = (playlist) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.playlist.create({
            data: playlist,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createPlaylist = createPlaylist;
const getPlaylists = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.playlist.findMany({
            where: {
                userId: userId,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPlaylists = getPlaylists;
const updatePlaylists = (playlistId, playlist) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(playlistId);
    try {
        return yield prisma.playlist.update({
            where: {
                id: playlistId,
            },
            data: playlist,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updatePlaylists = updatePlaylists;
const deletePlaylists = (playlistId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.playlist.deleteMany({
            where: {
                playlistId: playlistId,
                userId: userId,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deletePlaylists = deletePlaylists;
const isPlaylistAdded = (playlistId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.playlist.findFirst({
            where: {
                userId: userId,
                playlistId: playlistId,
            },
        });
        if (result)
            return true;
        return false;
    }
    catch (error) {
        console.log(error);
    }
});
exports.isPlaylistAdded = isPlaylistAdded;
