import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CategoryEnum, ICategoryType } from 'src/app/services/games.service';

export interface INavItem {
    name: string;
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
            slug: CategoryEnum.top
        },
        {
            name: 'New Games',
            slug: CategoryEnum.new
        },
        {
            name: 'Slots',
            slug: CategoryEnum.slots
        },
        {
            name: 'Jackpots',
            slug: CategoryEnum.jackpots
        },

        // "Classic" Formerly "Live", 'live' category doesn't exist
        {
            name: 'Classic',
            slug: CategoryEnum.classic
        },
        {
            name: 'Blackjack',
            slug: CategoryEnum.blackjack
        },
        {
            name: 'Roulette',
            slug: CategoryEnum.roulette
        },

        // Removed, since there's any 'table' category or
        // rule to show content for this item
        // {
        //     name: 'Table',        //
        //     slug: undefined
        // },

        {
            name: 'Poker',
            slug: CategoryEnum.poker
        },
        {
            name: 'Other',
            slug: CategoryEnum.other
        }
    ];

    ngOnChanges(changes): void {
        if (changes.category?.currentValue) {
            this.activeItem = changes.category.currentValue;
        }
    }
}
