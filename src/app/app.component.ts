import { AfterViewInit, Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GamesService, IGame } from './services/games.service';

@Component({
    selector: 'whg-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'whgApp';
    public games$: Observable<IGame[]>;
    constructor(private gameService: GamesService) {}

    ngOnInit() {
        this.games$ = this.gameService.getGames();
        const interval$ = interval(2000);
        // POC working
        // interval$.pipe(switchMap(() => this.gameService.getJackpots())).subscribe(console.log);
    }
}
