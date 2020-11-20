import { createAction, props } from '@ngrx/store';
import { IGame, IJackpot } from 'src/app/services/games.service';

const GAME_ACTION = 'whgActions/GameActions/';

export const GameActions = {
    // Games actions
    loadGames: createAction(GAME_ACTION + 'loadGames'),
    loadGamesSuccess: createAction(
        GAME_ACTION + 'loadGamesSuccess',
        props<{ response: IGame[] }>()
    ),
    updateGames: createAction(GAME_ACTION + 'updateGames'),

    // Jackpot actions
    loadJackpots: createAction(GAME_ACTION + 'loadJackpots'),
    loadJackpotsSuccess: createAction(
        GAME_ACTION + 'loadJackpotsSuccess',
        props<{ response: IJackpot[] }>()
    )
};
