import { createAction, props } from '@ngrx/store';
import { IJackpot } from 'src/app/services/games.service';

const GAME_ACTION = 'whgActions/GameActions/';

export const GameActions = {
    load: createAction(GAME_ACTION + 'load'),
    loadSuccess: createAction(GAME_ACTION + 'loadSuccess', props<{ games }>()),
    // Jackpot Actions
    loadJackpots: createAction(GAME_ACTION + 'loadJackpots'),
    loadJackpotsSuccess: createAction(
        GAME_ACTION + 'loadJackpotsSuccess',
        props<{ jackpots: IJackpot[] }>()
    )
};
