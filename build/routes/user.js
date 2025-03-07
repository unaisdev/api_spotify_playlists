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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Calling /register endpoint");
    const { user } = req.body;
    try {
        const existingUser = yield prisma.user.findUnique({
            where: { id: user.id },
        });
        if (existingUser) {
            return res.status(400).json({ error: "User already registered" });
        }
        const addedUser = yield (0, User_1.createUser)(user);
        res.json(addedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: JSON.stringify(error) });
    }
}));
exports.default = router;
