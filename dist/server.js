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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const Playlist_1 = require("./models/Playlist");
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("¡API funcionando!");
});
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
app.post("/playlists", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlistReq = req.body;
    try {
        const playlist = yield (0, Playlist_1.createPlaylist)(playlistReq);
        res.json(playlist);
    }
    catch (error) {
        res.status(500).json({ error: "Error al crear la playlist" });
    }
}));
app.get("/playlists", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playlists = yield (0, Playlist_1.getPlaylists)();
        res.json(playlists);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener las playlists" });
    }
}));
//# sourceMappingURL=server.js.map