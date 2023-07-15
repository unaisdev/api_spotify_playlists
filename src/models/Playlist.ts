import { Playlist, PrismaClient } from "@prisma/client";
import { AddPlaylist, AppUser } from "../types";

const prisma = new PrismaClient();

const createPlaylist = async (playlist: AddPlaylist) => {
  try {
    return await prisma.playlist.create({
      data: playlist,
    });
  } catch (error) {
    console.log(error);
  }
};

const getPlaylists = async (userId: string) => {
  try {
    return await prisma.playlist.findMany({
      where: {
        userId: userId,
      },
    });
  } catch (error) {
    // console.log(error);
  }
};

const updatePlaylists = async (playlist: AddPlaylist) => {
  try {
    console.log(playlist.id)
    return await prisma.playlist.update({
      where: {
        id: playlist.id,
        userId: playlist.userId,
        playlistId: playlist.playlistId,
      },
      data: playlist
    });
  } catch (error) {
    console.log(error);
  }
};

const deletePlaylists = async (playlistId: string, userId: string) => {
  try {
    return await prisma.playlist.deleteMany({
      where: {
        playlistId: playlistId,
        userId: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const isPlaylistAdded = async (playlistId: string, userId: string) => {
  try {
    const result = await prisma.playlist.findFirst({
      where: {
        userId: userId,
        playlistId: playlistId,
      },
    });

    if (result) return true;

    return false;
  } catch (error) {
    console.log(error);
  }
};

export { createPlaylist, getPlaylists, updatePlaylists, deletePlaylists, isPlaylistAdded };
