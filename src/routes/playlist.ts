import { Router, Request, Response } from "express";
import {
  createPlaylist,
  deletePlaylists,
  getPlaylists,
  isPlaylistAdded,
  updatePlaylists,
} from "../models/Playlist";
import NodeCache from "node-cache";

const router = Router();
// const cache = new NodeCache({ stdTTL: 600 });

router.post("/add", async (req: Request, res: Response) => {
  console.log("Calling /addPlaylistForNotify endpoint");

  const { playlistId, tracks, userId } = req.body;

  try {
    const playlistTrackIDs: string[] = tracks
      .map((item: any) => item.track?.id)
      .filter((id: string | undefined) => id !== undefined) as string[];

    const addPlaylist = {
      id: playlistId + userId,
      playlistId,
      userId,
      trackIds: playlistTrackIDs,
      last_update: new Date(),
    };

    const addedPlaylist = await createPlaylist(addPlaylist);
    res.json(addedPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

router.post("/getAll", async (req: Request, res: Response) => {
  console.log("Calling /getUserPlaylistsForNotify endpoint");

  const { userId } = req.body;

  // Verificar caché
  // const cachedPlaylists = cache.get(`playlists-${userId}`);
  // if (cachedPlaylists) {
  //   return res.status(200).json(cachedPlaylists);
  // }

  try {
    const playlists = await getPlaylists(userId);
    // cache.set(`playlists-${userId}`, playlists);
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

router.post("/update", async (req: Request, res: Response) => {
  console.log("Calling /updateUserPlaylistsForNotify endpoint");

  const { playlistId, playlist, userId, last_update } = req.body;

  try {
    const playlistTrackIDs: string[] = playlist.items
      .map((item: any) => item.track?.id)
      .filter((id: string | undefined) => id !== undefined) as string[];

    const updatePlaylistItem = {
      playlistId,
      userId,
      trackIds: playlistTrackIDs,
      last_update,
    };

    const updatedPlaylist = await updatePlaylists(
      playlistId + userId,
      updatePlaylistItem
    );

    // cache.del(`playlists-${userId}`); // Limpiar caché
    res.json(updatedPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

router.post("/delete", async (req: Request, res: Response) => {
  console.log("Calling /deleteUserPlaylistsForNotify endpoint");

  const { playlistId, userId } = req.body;

  try {
    const deleted = await deletePlaylists(playlistId, userId);
    // cache.del(`playlists-${userId}`); // Limpiar caché
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

router.post("/saved", async (req, res) => {
  console.log("Calling /isSavedPlaylistsForNotify endpoint");

  const { playlistId, userId } = req.body;

  try {
    const isSaved = await isPlaylistAdded(playlistId, userId);

    res.status(200).json(isSaved);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

export default router;
