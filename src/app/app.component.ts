import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
        this.games$ = this.gameService.fetchData();
    }
}
