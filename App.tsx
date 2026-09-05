import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { LiveChat } from './components/chat/LiveChat';
import { CaseCatalog } from './components/cases/CaseCatalog';
import { CaseOpeningView } from './components/cases/CaseOpeningView';
import { CaseBattleLobby } from './components/battles/CaseBattleLobby';
import { CaseBattleArena } from './components/battles/CaseBattleArena';
import { BlackjackTable } from './components/games/BlackjackTable';
import { UpgraderGame } from './components/games/UpgraderGame';
// Modals
import { AuthModal } from './components/modals/AuthModal';
import { DiscordModal } from './components/modals/DiscordModal';
import { FairnessModal } from './components/modals/FairnessModal';
import { InventoryModal } from './components/modals/InventoryModal';
import { RakebackModal } from './components/rewards/RakebackModal';
import { DailyLevelCasesModal } from './components/rewards/DailyLevelCasesModal';
import { WagerRaceModal } from './components/race/WagerRaceModal';
import { AdminPanel } from './components/admin/AdminPanel';
import { api } from './services/api';
import { getSocket } from './services/socket';
import { User, CaseDef, Battle, RainEvent, SkinItem } from './types';
import { SKINS_CATALOG } from './server/db';
import { SKINS_CATALOG } from './data/skins';
import { sounds } from './services/sound';
export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('cases');
  const [cases, setCases] = useState<CaseDef[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseDef | null>(null);
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);
  // Real-time states
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [activeRain, setActiveRain] = useState<RainEvent | null>(null);
  const [recentDrop, setRecentDrop] = useState<{ username: string; item: SkinItem; game: string } | null>(null);
  // Modals
  const [authOpen, setAuthOpen] = useState(false);
  const [discordOpen, setDiscordOpen] = useState(false);
  const [fairnessOpen, setFairnessOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [rakebackOpen, setRakebackOpen] = useState(false);
  const [dailyCasesOpen, setDailyCasesOpen] = useState(false);
  const [raceOpen, setRaceOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
