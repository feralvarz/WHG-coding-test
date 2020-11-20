import { createSelector } from '@ngrx/store';
import { IAppState } from './state';
import { JsUtils } from './utils';
import { IJackpot, IGame } from 'src/app/services/games.service';

const filterByCategory = (category: string, data: IGame[]) => {
    if (category) {
        const collection = data.reduce((acc, curr) => {
            let gameCategory: string | undefined;

            if (category === 'other') {
                const groupOthers = curr.categories.some(
                    cat => cat === 'ball' || cat === 'virtual' || cat === 'fun'
                );
                gameCategory = groupOthers ? category : undefined;
            } else {
                gameCategory = curr.categories.find(cat => cat === category);
            }

            return gameCategory === category ? acc.concat(curr) : acc;
        }, []);
        return collection;
    } else {
        return data;
    }
};

const filterFromJackpots = state => {
    const jackpotsIds = state.jackpots.map((jackpot: IJackpot) => jackpot.game);
    return state.games.filter((game: IGame) => jackpotsIds.indexOf(game.id) > -1);
};

export const selectGamesState = (state: IAppState) => state.gamesState;

/**
 * Game state selectors
 */
export const GamesState = {
    selectGames: createSelector(selectGamesState, (state, props) => {
        if (state.games.length) {
            const games = JsUtils.createCopy(state.games);

            if (props.category === 'jackpots') {
                return filterFromJackpots(state);
            } else {
                return filterByCategory(props.category, games);
            }
        } else {
            return state.games;
        }
    })
};
