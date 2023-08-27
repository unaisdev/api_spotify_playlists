import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {
  createPlaylist,
  deletePlaylists,
  getPlaylists,
  isPlaylistAdded,
  updatePlaylists,
} from "./models/Playlist";
import { createUser } from "./models/User";
import { User, Playlist, PrismaClient } from "@prisma/client";
import { AppUser, PlaylistItem, UpdatePlaylist } from "./types";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

app.post("/register", async (req, res) => {
  console.log("Calling /register endpoint");

  const { user }: { user: AppUser } = req.body;
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (existingUser) {
      console.log("user exists!!!!!");
      return res.status(400).json({ error: "User already registered" });
    }

    // Create the user
    const addedUser = await createUser(user);
    console.log(addedUser);

    res.json(addedUser);
  } catch (error) {
    res
      .status(500)
      .json({
        error: JSON.stringify("The user couldn't be registered on BBDD"),
      });
  }
});

app.post("/addPlaylistForNotify", async (req, res) => {
  console.log("Calling /addPlaylistForNotify endpoint");

  const { playlistId, tracks, userId } = req.body;
  console.log(req.body);

  try {
    const playlistTrackIDs: string[] = tracks
      .map((item: PlaylistItem) => {
        if (item.track.id !== null && item.track.id !== undefined) {
          return item.track.id;
        }
      })
      .filter((id: string) => id !== undefined);

    const addPlaylist = {
      id: playlistId + userId,
      playlistId: playlistId,
      userId: userId,
      trackIds: playlistTrackIDs,
      last_update: new Date(),
    };

    const addedPlaylist = await createPlaylist(addPlaylist);

    res.json(addedPlaylist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

app.post("/getUserPlaylistsForNotify", async (req, res) => {
  console.log("Calling /getUserPlaylistsForNotify endpoint");

  const { userId } = req.body;
  console.log(userId);

  try {
    const playlists = await getPlaylists(userId);
    console.log(playlists);

    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

app.post("/updateUserPlaylistsForNotify", async (req, res) => {
  console.log("Calling /updateUserPlaylistsForNotify endpoint");

  const { playlistId, playlist, userId, last_update } = req.body;

  try {
    const playlistTrackIDs: string[] = playlist.items
      .map((item: PlaylistItem) => {
        if (item.track.id !== null && item.track.id !== undefined) {
          return item.track.id;
        }
      })
      .filter((id: string) => id !== undefined);

    const updatePlaylistItem = {
      playlistId: playlistId,
      userId: userId,
      trackIds: playlistTrackIDs,
      last_update: last_update,
    } as UpdatePlaylist;

    const updatedPlaylist = await updatePlaylists(
      playlistId + userId,
      updatePlaylistItem
    );

    console.log(updatedPlaylist);
    res.json(updatedPlaylist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

app.post("/isSavedPlaylistsForNotify", async (req, res) => {
  console.log("Calling /isSavedPlaylistsForNotify endpoint");

  const { playlistId, userId } = req.body;

  try {
    const isSaved = await isPlaylistAdded(playlistId, userId);

    res.status(200).json(isSaved);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

app.post("/deleteUserPlaylistsForNotify", async (req, res) => {
  console.log("Calling /deleteUserPlaylistsForNotify endpoint");

  const { playlistId, userId } = req.body;

  try {
    const deleted = await deletePlaylists(playlistId, userId);

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});
