import { createReducer, on } from '@ngrx/store';
import { GameActions } from './games.actions';
import { initialGamesState } from './games.state';

export const initialState = 0;

const _gameReducer = createReducer(
    initialGamesState,
    on(GameActions.load, state => ({ ...state, games: 1500 })),
    on(GameActions.loadSuccess, (state, props) => ({ ...state, games: 3000, list: props.games }))
);

export function gamesStateReducer(state, action) {
    return _gameReducer(state, action);
}
