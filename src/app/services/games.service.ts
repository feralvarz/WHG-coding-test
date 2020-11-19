import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, concat, interval, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

export enum CategoryEnum {
    top = 'top',
    slots = 'slots',
    new = 'new',
    classic = 'classic',
    poker = 'poker',
    roulette = 'roulette',
    blackjack = 'blackjack',
    fun = 'fun',
    virtual = 'virtual',
    ball = 'ball',
    other = 'other'
}

export type ICategoryType = keyof typeof CategoryEnum;

export interface IGame {
    categories: ICategoryType[];
    name: string;
    image: string;
    id: string;
    jackpot?: number;
}

export interface IJackpot {
    game: string;
    amount: number;
}

export enum RibbonEnum {
    new = 'new',
    top = 'top',
    // Additional type indicating top + new
    hot = 'hot'
}

export type RibbonTypes = keyof typeof RibbonEnum;

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    private readonly BASE = '//stage.whgstage.com/front-end-test';
    private readonly ENDPOINTS = {
        GAMES: 'games',
        JACKPOTS: 'jackpots'
    };

    private games: IGame[] = [];

    constructor(private httpClient: HttpClient) {}

    public getGames(): Observable<IGame[]> {
        const url = `${this.BASE}/${this.ENDPOINTS.GAMES}.php`;
        return this.httpClient.get<IGame[]>(url);
    }
    public getJackpots(): Observable<IJackpot[]> {
        const url = `${this.BASE}/${this.ENDPOINTS.JACKPOTS}.php`;
        return this.httpClient.get<IJackpot[]>(url);
    }

    public fetchData(): Observable<IGame[]> {
        const updateInterval = interval(5000).pipe(take(10));
        const jackpots$ = updateInterval.pipe(switchMap(() => this.getJackpots()));
        const games$ = this.lazyLoadGames();

        const gamesWithJackpots$ = combineLatest([games$, jackpots$]).pipe(
            map(([games, jackpots]) => {
                let gamesList: IGame[] = games;

                jackpots.forEach((jp: IJackpot) => {
                    const updateGame = gamesList.find(game => game.id === jp.game);
                    if (updateGame) {
                        updateGame.jackpot = jp.amount;
                    } else {
                        updateGame.jackpot = null;
                    }
                });

                this.games = gamesList;
                return this.games;
            })
        );

        return concat(this.getGames(), gamesWithJackpots$);
    }

    private lazyLoadGames(): Observable<IGame[]> {
        return this.games.length > 0 ? of(this.games) : this.getGames();
    }
}
