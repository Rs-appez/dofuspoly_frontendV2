export interface Game {
  id: number;
  board: { spaces: Space[] };
  players: Player[];
  dice1Value: number;
  dice2Value: number;
  turn: number;
  finished: boolean;
  current_player: string;
}

export interface Space {
  name: string;
  type: string;
  color: string;
  price: number;
  position: number;
  can_be_bought: boolean;
}

export interface Player {
  username: string;
  position: number;
  has_rolled: boolean;
  nb_double_rolls: number;
  money: number;
  in_jail: boolean;
  jail_turns: number;
  owned_spaces: OwnedSpace[];
  cards: Card[];
  image: string;
}

export interface Card { }

export interface OwnedSpace {
  space: string;
  houses: number;
  has_hotel: boolean;
  is_mortgaged: boolean;
}
