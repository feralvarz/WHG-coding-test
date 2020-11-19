import { createSelector } from '@ngrx/store';
import { IGamesState } from './games/games.state';
import { IAppState } from './state';

export const selectGamesState = (state: IAppState) => state.gamesState;

/**
 * Game state selectors
 */
export const GamesState = {
    selectGames: createSelector(selectGamesState, state => state.games),
    list: createSelector(selectGamesState, state => state.list)
};
