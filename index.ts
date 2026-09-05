import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { Server } from 'socket.io';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Database, CASES_CATALOG, SKINS_CATALOG } from './db';
import { ProvablyFair } from './provablyFair';
import { SocketHandler } from './socketHandler';
import { BlackjackGameState, PlayingCard, SkinItem } from '../types';
const JWT_SECRET = 'clash-casino-super-secret-key-2026';
const PORT = 4000;
Database.initialize();
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
const socketHandler = new SocketHandler(io);
io.on('connection', (socket) => socketHandler.handleConnection(socket));
// In-memory active blackjack games
const activeBlackjackGames: Record<string, BlackjackGameState & { serverSeed: string; deck: PlayingCard[]; userId: string }> = {};
// Helper: Calculate Blackjack hand score
function calculateHandScore(cards: PlayingCard[]): number {
