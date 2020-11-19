import { IGame } from '../../services/games.service';

export interface IGamesState {
    games: number;
    list: IGame[];
}

/**
 * Initial Games State
 */
export const initialGamesState: IGamesState = {
    games: 0,
    list: []
};
