import { PrismaClient, User } from "@prisma/client";
import { AppUser } from "../types";

const prisma = new PrismaClient();

const createUser = async (user: AppUser) => {
  return await prisma.user.create({
    data: {
      display_name: user.display_name,
      followers_num: String(user.followers),
      image: user.images[0].url,
      uri: user.uri,
      id: user.id,
    },
  });
};

const getUsers = async () => {
  return await prisma.user.findMany();
};
export { createUser, getUsers };
