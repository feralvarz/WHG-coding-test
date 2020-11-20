import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GamesService, IGame } from './services/games.service';
import { GameActions } from './store/games/games.actions';
import { GamesState } from './store/selectors';
import { IAppState } from './store/state';

@Component({
    selector: 'whg-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public games$: Observable<IGame[]>;

    constructor(private gameService: GamesService, private store: Store<IAppState>) {}

    ngOnInit() {
        this.store.dispatch(GameActions.loadJackpots());
        this.store.dispatch(GameActions.loadGames());

        this.games$ = this.store.select(GamesState.selectGames);

        setInterval(() => {
            this.store.dispatch(GameActions.loadJackpots());
        }, 2000);
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
