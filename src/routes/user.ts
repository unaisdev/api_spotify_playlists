import { Router } from "express";
import { createUser } from "../models/User";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
  console.log("Calling /register endpoint");

  const { user } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    const addedUser = await createUser(user);
    res.json(addedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

export default router;
