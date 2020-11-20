import { createEffect, ofType, Actions } from '@ngrx/effects';
import { GamesService } from '../../services/games.service';
import { GameActions } from './games.actions';
import { switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class GamesEffects {
    constructor(private readonly actions$: Actions, private readonly gamesService: GamesService) {}

    public loadGames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameActions.loadGames),
            switchMap(() =>
                this.gamesService
                    .getGames()
                    .pipe(
                        switchMap(response => [
                            GameActions.loadGamesSuccess({ response }),
                            GameActions.updateGames()
                        ])
                    )
            )
        )
    );

    public loadJackpots$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameActions.loadJackpots),
            switchMap(() =>
                this.gamesService
                    .getJackpots()
                    .pipe(
                        switchMap(response => [
                            GameActions.loadJackpotsSuccess({ response }),
                            GameActions.updateGames()
                        ])
                    )
            )
        )
    );
}
