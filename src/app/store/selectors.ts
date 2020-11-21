import { createSelector } from '@ngrx/store';
import { IAppState } from './state';
import { JsUtils } from './utils';
import { IJackpot, IGame, CategoryEnum, ICategoryType } from 'src/app/services/games.service';

/**
 * Filter Games by Categoy
 * @param category query param from navigation
 * @param games array of games
 */
const filterByCategory = (category: ICategoryType, games: IGame[]) => {
    if (category) {
        const collection = games.reduce((acc, game) => {
            let gameCategory: ICategoryType | undefined;

            switch (category) {
                case CategoryEnum.other:
                    const groupOthers = game.categories.some(
                        cat =>
                            cat === CategoryEnum.ball ||
                            cat === CategoryEnum.virtual ||
                            cat === CategoryEnum.fun
                    );
                    // Mapping categories to 'other'
                    gameCategory = groupOthers ? category : undefined;
                    break;
                default:
                    gameCategory = game.categories.find(cat => cat === category);
                    break;
            }

            return gameCategory === category ? acc.concat(game) : acc;
        }, []);
        return collection;
    } else {
        return games;
    }
};

/**
 * Filter games with jackpots
 * @param state application state
 */
const filterFromJackpots = state => {
    const jackpotsIds = state.jackpots.map((jackpot: IJackpot) => jackpot.game);
    return state.games.filter((game: IGame) => jackpotsIds.indexOf(game.id) > -1);
};

// Games State
export const selectGamesState = (state: IAppState) => state.gamesState;

/**
 * Game state selectors
 */
export const GamesState = {
    selectGames: createSelector(selectGamesState, (state, props) => {
        if (state.games.length) {
            const games = JsUtils.createCopy(state.games);

            if (props.category === CategoryEnum.jackpots) {
                return filterFromJackpots(state);
            } else {
                return filterByCategory(props.category, games);
            }
        } else {
            return state.games;
        }
    })
};
