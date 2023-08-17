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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const Playlist_1 = require("./models/Playlist");
const User_1 = require("./models/User");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use((0, cors_1.default)());
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Calling /register endpoint");
    const { user } = req.body;
    try {
        // Check if user already exists
        const existingUser = yield prisma.user.findUnique({
            where: {
                id: user.id,
            },
        });
        if (existingUser) {
            console.log("user exists!!!!!");
            return res.status(400).json({ error: "User already registered" });
        }
        // Create the user
        const addedUser = yield (0, User_1.createUser)(user);
        console.log(addedUser);
        res.json(addedUser);
    }
    catch (error) {
        res.status(500).json({ error: JSON.stringify(error) });
    }
}));
app.post("/addPlaylistForNotify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Calling /addPlaylistForNotify endpoint");
    const { playlistId, tracks, userId } = req.body;
    console.log(req.body);
    try {
        const playlistTrackIDs = tracks
            .map((item) => {
            if (item.track.id !== null && item.track.id !== undefined) {
                return item.track.id;
            }
        })
            .filter((id) => id !== undefined);
        const addPlaylist = {
            id: playlistId + userId,
            playlistId: playlistId,
            userId: userId,
            trackIds: playlistTrackIDs,
            last_update: new Date(),
        };
        const addedPlaylist = yield (0, Playlist_1.createPlaylist)(addPlaylist);
        res.json(addedPlaylist);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: JSON.stringify(error) });
    }
}));
app.post("/getUserPlaylistsForNotify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Calling /getUserPlaylistsForNotify endpoint");
    const { userId } = req.body;
    console.log(userId);
    try {
        const playlists = yield (0, Playlist_1.getPlaylists)(userId);
        console.log(playlists);
        res.status(200).json(playlists);
    }
    catch (error) {
        res.status(500).json({ error: JSON.stringify(error) });
    }
}));
app.post("/updateUserPlaylistsForNotify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Calling /updateUserPlaylistsForNotify endpoint");
    const { playlistId, playlist, userId, last_update } = req.body;
    try {
        const playlistTrackIDs = playlist.items
            .map((item) => {
            if (item.track.id !== null && item.track.id !== undefined) {
                return item.track.id;
            }
        })
            .filter((id) => id !== undefined);
        const updatePlaylistItem = {
            playlistId: playlistId,
            userId: userId,
            trackIds: playlistTrackIDs,
            last_update: last_update,
        };
        const updatedPlaylist = yield (0, Playlist_1.updatePlaylists)(playlistId + userId, updatePlaylistItem);
        console.log(updatedPlaylist);
        res.json(updatedPlaylist);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: JSON.stringify(error) });
    }
}));
app.post("/isSavedPlaylistsForNotify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.post("/deleteUserPlaylistsForNotify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Calling /deleteUserPlaylistsForNotify endpoint");
    const { playlistId, userId } = req.body;
    try {
        const deleted = yield (0, Playlist_1.deletePlaylists)(playlistId, userId);
        res.status(200).json(deleted);
    }
    catch (error) {
        res.status(500).json({ error: JSON.stringify(error) });
    }
}));
