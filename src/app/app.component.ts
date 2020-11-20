import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGame } from './services/games.service';
import { GameActions } from './store/games/games.actions';
import { GamesState } from './store/selectors';
import { IAppState } from './store/state';
import { ActivatedRoute } from '@angular/router';
import { tap, pluck, filter, map } from 'rxjs/operators';

@Component({
    selector: 'whg-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public games$: Observable<IGame[]>;

    constructor(private store: Store<IAppState>, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.store.dispatch(GameActions.loadJackpots());
        this.store.dispatch(GameActions.loadGames());

        this.activatedRoute.queryParams
            .pipe(
                pluck('category'),
                filter(category => category !== undefined),
                tap(category => {
                    this.games$ = this.store.select(GamesState.selectGames, { category });
                })
            )
            .subscribe();

        /**
         * Update jackpots
         */
        // setInterval(() => {
        //     this.store.dispatch(GameActions.loadJackpots());
        // }, 2000);
    }

    /**
     * Track by function for the events
     *
     * @param index Index of the option in the ngFor
     * @param option The event to track
     * @return The value to track changes for
     */
    public trackByFn(index: number, event: IGame) {
        return event.id;
    }
}
