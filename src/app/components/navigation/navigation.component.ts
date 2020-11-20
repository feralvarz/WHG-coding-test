import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CategoryEnum, ICategoryType } from 'src/app/services/games.service';

export interface INavItem {
    name: string;
    active: boolean;
    slug: ICategoryType;
}

@Component({
    selector: 'whg-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnChanges {
    @Input() category: string;
    menuActive = false;
    activeItem: string;

    menuItems: INavItem[] = [
        {
            name: 'Top Games',
            active: false,
            slug: CategoryEnum.top
        },
        {
            name: 'New Games',
            active: false,
            slug: CategoryEnum.new
        },
        {
            name: 'Slots',
            active: false,
            slug: CategoryEnum.slots
        },
        {
            name: 'Jackpots',
            active: false,
            slug: CategoryEnum.jackpots
        },

        // "Classic" Formerly "Live", 'live' category doesn't exist
        {
            name: 'Classic',
            active: false,
            slug: CategoryEnum.classic
        },
        {
            name: 'Blackjack',
            active: false,
            slug: CategoryEnum.blackjack
        },
        {
            name: 'Roulette',
            active: false,
            slug: CategoryEnum.roulette
        },

        // Removed, since there's any 'table' category or
        // rule to show content for this item
        // {
        //     name: 'Table',
        //     active: false,
        //     slug: undefined
        // },

        {
            name: 'Poker',
            active: false,
            slug: CategoryEnum.poker
        },
        {
            name: 'Other',
            active: false,
            slug: CategoryEnum.other
        }
    ];

    constructor() {}

    ngOnChanges(changes): void {
        if (changes.category?.currentValue) {
            console.log(changes.category.currentValue);
            this.activeItem = changes.category.currentValue;
        }
    }
}
