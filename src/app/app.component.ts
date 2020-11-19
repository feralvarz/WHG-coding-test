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
    title = 'Enjoy our Games!';
    public games$: Observable<IGame[]>;
    count$: Observable<number>;
    constructor(private gameService: GamesService, private store: Store<IAppState>) {}

    ngOnInit() {
        this.games$ = this.gameService.fetchData();
        this.count$ = this.store.select(GamesState.selectGames);

        this.store.dispatch(GameActions.load());
        this.store.dispatch(GameActions.loadJackpots());
    }
}
