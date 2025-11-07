export interface Game {
  id: number;
  board: { spaces: Space[] };
  players: Player[];
  dice1Value: number;
  dice2Value: number;
  turn: number;
  finished: boolean;
  current_player: Player;
}

export interface Space {
  name: string;
  type: string;
  color: string;
  price: number;
  position: number;
}

export interface Player {
  username: string;
  position: number;
  has_rolled: boolean;
  money: number;
  in_jail: boolean;
  jail_turns: number;
  cards: Card[];
  image: string;
}

export interface Card { }
