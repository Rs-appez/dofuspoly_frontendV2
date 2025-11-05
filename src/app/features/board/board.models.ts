export interface Game {
  id: number;
  board: { cases: Case[] };
  players: Player[];
  turn: number;
  finished: boolean;
  current_player: Player;
}

export interface Case {
  name: string;
  type: string;
  color: string;
  price: number;
}

export interface Player {
  id: string;
  user: string;
  position: number;
  money: number;
  in_jail: boolean;
  jail_turns: number;
  cards: Card[];
  image: string;
}

export interface Card { }
