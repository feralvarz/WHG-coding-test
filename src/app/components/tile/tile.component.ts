import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IGame, RibbonEnum, RibbonTypes } from '../../services/games.service';

@Component({
    selector: 'whg-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit, OnChanges {
    @Input() data: IGame;
    @Input() category: string = '';

    public game: IGame;
    public ribbonType: RibbonTypes;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(change) {
        if (!!change.data) {
            this.game = change.data.currentValue;

            const ribbons = this.getRibbon();

            this.ribbonType = ribbons.length > 1 ? RibbonEnum.hot : ribbons[0];
        }
    }

    /**
     * Return relevant ribbon type
     * in the context of a category which isn’t “top” or “new”.
     */
    private getRibbon(): RibbonTypes[] {
        return this.game.categories
            .map(category => {
                if (category === RibbonEnum.new || category === RibbonEnum.top) {
                    if (category.toString() !== this.category) {
                        return category as RibbonTypes;
                    }
                }
            })
            .filter(val => val !== undefined);
    }
}
