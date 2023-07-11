import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createPlaylist, deletePlaylists, getPlaylists, isPlaylistAdded } from "./models/Playlist";
import { createUser } from "./models/User";
import { User, Playlist, PrismaClient } from "@prisma/client";
import { AppUser, PlaylistItem } from "./types";

const prisma = new PrismaClient();

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

app.post("/register", async (req, res) => {
  const user = req.body as AppUser;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    // Create the user
    const addedUser = await createUser(user);
    res.json(addedUser);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

app.post("/addPlaylistForNotify", async (req, res) => {
  const { playlistId, playlist, user } = req.body;

  try {
    const playlistTrackIDs = playlist.items.map(
      (item: PlaylistItem) => item.track.id
    );

    const addPlaylist = {
      id: playlistId + user,
      playlistId: playlistId,
      userId: user,
      trackIds: playlistTrackIDs,
      last_update: new Date(),
    };

    const addedPlaylist = await createPlaylist(addPlaylist);

    res.json(addedPlaylist);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

app.post("/getUserPlaylistsForNotify", async (req, res) => {
  const { user } = req.body;

  try {

    const playlists = await getPlaylists(user);

    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

app.post("/isSavedPlaylistsForNotify", async (req, res) => {
  const { playlistId, userId } = req.body;

  try {

    const isSaved = await isPlaylistAdded(playlistId, userId);

    res.status(200).json(isSaved);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

app.post("/deleteUserPlaylistsForNotify", async (req, res) => {
  const { playlistId, userId } = req.body;

  try {

    const deleted = await deletePlaylists(playlistId, userId);

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

