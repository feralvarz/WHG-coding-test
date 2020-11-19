import { Store } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { GamesService } from '../../services/games.service';
import { GameActions } from './games.actions';
import { tap, switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class GamesEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly gamesService: GamesService
    ) {}

    public loadGames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameActions.load),
            switchMap(() =>
                this.gamesService.getGames().pipe(map(games => GameActions.loadSuccess({ games })))
            )
        )
    );

    public loadJackpots$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameActions.loadJackpots),
            switchMap(() =>
                this.gamesService
                    .getJackpots()
                    .pipe(map(jackpots => GameActions.loadJackpotsSuccess({ jackpots })))
            )
        )
    );
}
