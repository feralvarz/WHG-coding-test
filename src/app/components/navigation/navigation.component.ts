import { Component, OnInit } from '@angular/core';
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
export class NavigationComponent implements OnInit {
    menuActive = false;

    menuItems: INavItem[] = [
        {
            name: 'Top Games',
            active: false,
            slug: CategoryEnum.top
        },
        {
            name: 'New Games',
            active: true,
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
            slug: undefined
        },
        {
            name: 'Live',
            active: false,
            slug: undefined
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
        {
            name: 'Table',
            active: false,
            slug: undefined
        },
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

    ngOnInit(): void {}
}
