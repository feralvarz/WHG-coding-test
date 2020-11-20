import { IGame } from '../../services/games.service';
import { IJackpot } from 'src/app/services/games.service';

export interface IGamesState {
    games: IGame[];
    jackpots: IJackpot[];
}

/**
 * Initial Games State
 */
export const initialGamesState: IGamesState = {
    games: [],
    jackpots: null
};
