import { createSelector } from '@ngrx/store';
import { IAppState } from './state';

export const selectGamesState = (state: IAppState) => state.gamesState;

/**
 * Game state selectors
 */
export const GamesState = {
    selectGames: createSelector(selectGamesState, (state, props) => {
        console.log(props);
        return state.games;
    })
};
