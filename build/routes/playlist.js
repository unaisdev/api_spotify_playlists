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
const express_1 = require("express");
const Playlist_1 = require("../models/Playlist");
const playlistValidation_1 = require("../services/playlistValidation");
const router = (0, express_1.Router)();
// const cache = new NodeCache({ stdTTL: 600 });
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Calling /addPlaylistForNotify endpoint");
    const { playlistId, tracks, userId } = req.body;
    try {
        // Validate playlist addition
        const validationError = yield playlistValidation_1.PlaylistValidationService.validatePlaylistAddition(userId, tracks);
        if (validationError) {
            return res.status(400).json(validationError);
        }
        const playlistTrackIDs = tracks
            .map((item) => { var _a; return (_a = item.track) === null || _a === void 0 ? void 0 : _a.id; })
            .filter((id) => id !== undefined);
        const addPlaylist = {
            id: playlistId + userId,
            playlistId,
            userId,
            trackIds: playlistTrackIDs,
            last_update: new Date(),
        };
        const addedPlaylist = yield (0, Playlist_1.createPlaylist)(addPlaylist);
        res.json(addedPlaylist);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: JSON.stringify(error) });
    }
}));
router.post("/getAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Calling /getUserPlaylistsForNotify endpoint");
    const { userId } = req.body;
    // Verificar caché
    // const cachedPlaylists = cache.get(`playlists-${userId}`);
    // if (cachedPlaylists) {
    //   return res.status(200).json(cachedPlaylists);
    // }
    try {
        const playlists = yield (0, Playlist_1.getPlaylists)(userId);
        // cache.set(`playlists-${userId}`, playlists);
        res.status(200).json(playlists);
    }
    catch (error) {
        res.status(500).json({ error: JSON.stringify(error) });
    }
}));
router.post("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Calling /updateUserPlaylistsForNotify endpoint");
    const { playlistId, playlist, userId, last_update } = req.body;
    try {
        const playlistTrackIDs = playlist.items
            .map((item) => { var _a; return (_a = item.track) === null || _a === void 0 ? void 0 : _a.id; })
            .filter((id) => id !== undefined);
        const updatePlaylistItem = {
            playlistId,
            userId,
            trackIds: playlistTrackIDs,
            last_update,
        };
        const updatedPlaylist = yield (0, Playlist_1.updatePlaylists)(playlistId + userId, updatePlaylistItem);
        // cache.del(`playlists-${userId}`); // Limpiar caché
        res.json(updatedPlaylist);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: JSON.stringify(error) });
    }
}));
router.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Calling /deleteUserPlaylistsForNotify endpoint");
    const { playlistId, userId } = req.body;
    try {
        const deleted = yield (0, Playlist_1.deletePlaylists)(playlistId, userId);
        // cache.del(`playlists-${userId}`); // Limpiar caché
        res.status(200).json(deleted);
    }
    catch (error) {
        res.status(500).json({ error: JSON.stringify(error) });
    }
}));
router.post("/saved", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Calling /isSavedPlaylistsForNotify endpoint");
    const { playlistId, userId } = req.body;
    try {
        const isSaved = yield (0, Playlist_1.isPlaylistAdded)(playlistId, userId);
        res.status(200).json(isSaved);
    }
    catch (error) {
        res.status(500).json({ error: JSON.stringify(error) });
    }
}));
exports.default = router;
