import { createReducer, on } from '@ngrx/store';
import { GameActions } from './games.actions';
import { initialGamesState } from './games.state';
import { JsUtils } from '../utils';
import { IJackpot } from 'src/app/services/games.service';

const gameReducer = createReducer(
    initialGamesState,
    on(GameActions.loadGames, state => state),
    on(GameActions.updateGames, (state, props) => {
        if (state.games.length && state.jackpots) {
            const gamesCopy = JsUtils.createCopy(state.games);
            const jackpots = state.jackpots;

            jackpots.forEach((jp: IJackpot) => {
                const updateGame = gamesCopy.find(game => game.id === jp.game);
                if (updateGame) {
                    updateGame.jackpot = jp.amount;
                } else {
                    updateGame.jackpot = null;
                }
            });

            return { ...state, games: gamesCopy };
        } else {
            return state;
        }
    }),
    on(GameActions.loadGamesSuccess, (state, props) => ({ ...state, games: props.response })),
    on(GameActions.loadJackpotsSuccess, (state, props) => ({ ...state, jackpots: props.response }))
);

export function gamesStateReducer(state, action) {
    return gameReducer(state, action);
}
