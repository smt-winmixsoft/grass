import { AppState } from '@/store/state';
import { UiState } from '@/store/ui/state';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { Observable } from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
  @HostBinding('class') classes: string = BASE_CLASSES;
  public ui: Observable<UiState>;
  public user;
  public menu = MENU;

  constructor(
    public appService: AppService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.ui = this.store.select('ui');
    this.ui.subscribe((state: UiState) => {
      this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
    });
    this.user = this.appService.user;
  }
}

export const MENU = [
  {
    name: 'Dashboard',
    path: ['/'],
    class: "fas fa-tachometer-alt"
  },

  // {
  //   name: 'Blank',
  //   path: ['/blank']
  // },
  {
    name: "References",
    i18n: "MENU.WORKIN",
    class: "fas fa-calendar",

    children: [
      {
        name: "Drying",
        path: ['/drying'],
        i18n: "PARTY.LABEL.DRYING",
        class: "fas fa-fire"
      },
      {
        name: "Trade",
        path: ['/trade'],
        i18n: "PARTY.LABEL.TRADE",
        class: "fas fa-euro-sign"
      },
    ]
  },
  {
    name: "References",
    i18n: "MENU.REFERENCES",
    class: "fas fa-book",

    children: [
      {
        name: "Clients",
        path: ['/client'],
        i18n: "CLIENT.TITLE",
        class: "fas fa-user"
      },
      {
        name: "Pack types",
        path: ['/pack-type'],
        i18n: "PACK_TYPE.TITLE",
        class: "far fa-circle"
      },
      {
        name: "Raw materials",
        path: ['/material'],
        i18n: "MATERIAL.TITLE",
        class: "far fa-circle"
      },
      {
        name: "Analysis types",
        path: ['/analysis-type'],
        i18n: "ANALYSIS_TYPE.TITLE",
        class: "far fa-circle"
      },
      {
        name: "Price-lists",
        path: ['/price'],
        i18n: "PRICE.TITLE",
        class: "far fa-circle"
      },
      {
        name: "BTW",
        path: ['/btw'],
        i18n: "BTW.TITLE",
        class: "far fa-circle"
      },
    ]
  },
  // {
  //   name: 'Main Menu',
  //   children: [
  //     {
  //       name: 'Sub Menu',
  //       path: ['/sub-menu-1']
  //     },

  //     {
  //       name: 'Blank',
  //       path: ['/sub-menu-2']
  //     }
  //   ]
  // }
];
