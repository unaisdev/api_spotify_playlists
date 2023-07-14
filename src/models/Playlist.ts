import { Playlist, PrismaClient } from "@prisma/client";
import { AddPlaylist, AppUser } from "../types";
import * as fs from 'node:fs';
import path from "path";

const prisma = new PrismaClient();

const createPlaylist = async (playlist: AddPlaylist) => {
  try {
    return await prisma.playlist.create({
      data: playlist,
    });
  } catch (error) {
    const errorMessage = `Error in createPlaylist: ${error}`;
    const filePath = path.join(__dirname, "error.txt");
    fs.writeFileSync(filePath, errorMessage);
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

const deletePlaylists = async (playlistId: string, userId: string) => {
  try {
    return await prisma.playlist.deleteMany({
      where: {
        playlistId: playlistId,
        userId: userId,
      },
    });
  } catch (error) {
    // console.log(error);
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
    // console.log(error);
  }
};

export { createPlaylist, getPlaylists, deletePlaylists, isPlaylistAdded };
