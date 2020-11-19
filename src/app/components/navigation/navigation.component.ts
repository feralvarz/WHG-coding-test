import { Component, OnInit } from '@angular/core';

export interface INavItem {
  name: string;
  active: boolean;
}

@Component({
  selector: 'whg-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  menuActive = false;

  menuItems: INavItem[] = [
    {
      name: 'Top Games',
      active: false,
    },
    {
      name: 'New Games',
      active: true,
    },
    {
      name: 'Slots',
      active: false,
    },
    {
      name: 'Jackpots',
      active: false,
    },
    {
      name: 'Live',
      active: false,
    },
    {
      name: 'Blackjack',
      active: false,
    },
    {
      name: 'Roulette',
      active: false,
    },
    {
      name: 'Table',
      active: false,
    },
    {
      name: 'Poker',
      active: false,
    },
    {
      name: 'Other',
      active: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
