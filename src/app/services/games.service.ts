import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum CategoryEnum {
    top = 'top', //ok
    slots = 'slots', //ok
    new = 'new', // ok
    classic = 'classic',
    poker = 'poker', //ok
    roulette = 'roulette', //ok
    blackjack = 'blackjack', //ok
    fun = 'fun', //ok
    virtual = 'virtual', //ok
    ball = 'ball', //ok
    other = 'other', //ok
    //Additional type added from menu design, used to filter by jackpots only.
    jackpots = 'jackpots'
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
    // Additional type indicating top && new
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

    constructor(private httpClient: HttpClient) {}

    public getGames(): Observable<IGame[]> {
        const url = `${this.BASE}/${this.ENDPOINTS.GAMES}.php`;
        return this.httpClient.get<IGame[]>(url);
    }
    public getJackpots(): Observable<IJackpot[]> {
        const url = `${this.BASE}/${this.ENDPOINTS.JACKPOTS}.php`;
        return this.httpClient.get<IJackpot[]>(url);
    }
}
