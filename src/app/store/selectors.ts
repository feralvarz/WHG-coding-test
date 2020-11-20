import { createSelector } from '@ngrx/store';
import { IGame } from '../services/games.service';
import { IAppState } from './state';
import { JsUtils } from './utils';

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

export const selectGamesState = (state: IAppState) => state.gamesState;

/**
 * Game state selectors
 */
export const GamesState = {
    selectGames: createSelector(selectGamesState, (state, props) => {
        if (state.games.length) {
            const games = JsUtils.createCopy(state.games);
            return filterByCategory(props.category, games);
        } else {
            return state.games;
        }
    })
};
