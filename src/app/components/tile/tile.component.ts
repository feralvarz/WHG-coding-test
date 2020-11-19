import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IGame, RibbonEnum, RibbonTypes } from '../../services/games.service';

@Component({
    selector: 'whg-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit, OnChanges {
    @Input() data: IGame;
    public game: IGame;
    public ribbonType: RibbonTypes;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(change) {
        if (!!change.data) {
            this.game = change.data.currentValue;
            const ribbons: RibbonTypes[] = this.game.categories.map(category => {
                if (category === RibbonEnum.new || category === RibbonEnum.top) {
                    return category as RibbonTypes;
                }
            });

            this.ribbonType = ribbons.length > 1 ? RibbonEnum.hot : ribbons[0];
        }
    }
}
