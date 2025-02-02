"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const node_cache_1 = __importDefault(require("node-cache"));
const client_1 = require("@prisma/client");
const playlist_1 = __importDefault(require("./routes/playlist"));
const user_1 = __importDefault(require("./routes/user"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const cache = new node_cache_1.default({ stdTTL: 600, checkperiod: 120 }); // Cache con TTL de 10 minutos
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use((0, cors_1.default)());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});
app.use("/user", user_1.default);
app.use("/playlist", playlist_1.default);
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
