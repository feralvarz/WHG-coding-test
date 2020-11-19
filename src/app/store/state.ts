import { ActionReducerMap } from '@ngrx/store';
import { gamesStateReducer } from './games/games.reducer';
import { IGamesState, initialGamesState } from './games/games.state';

export interface IAppState {
    gamesState: IGamesState;
}

export const appStateReducerMap: ActionReducerMap<IAppState> = {
    gamesState: gamesStateReducer
};

export const AppState: IAppState = {
    gamesState: initialGamesState
};
