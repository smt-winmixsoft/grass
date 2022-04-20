import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { PartyComponent } from './party.component';
import { PartyMainComponent } from './main/party-main.component';
import { PartyAddComponent } from './add/party-add.component';
import { PartyDelComponent } from './del/party-del.component';
import { PartyEditComponent } from './edit/party-edit.component';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { PartyItemComponent } from './components/party-item/party-item.component';
import { ClientComponent } from './components/client/client.component';
import { ShipMainComponent } from './ship/ship-main/ship-main.component';
import { ShipAddComponent } from './ship/ship-add/ship-add.component';
import { ShipDelComponent } from './ship/ship-del/ship-del.component';
import { ShipEditComponent } from './ship/ship-edit/ship-edit.component';
import { ShipItemComponent } from './ship/ship-item/ship-item.component';
import { PartyInfoComponent } from './components/party-info/party-info.component';
import { ShipPrintComponent } from './ship/ship-print/ship-print.component';


export const routes: Routes = [
  /*{ path: '', redirectTo: 'main', pathMatch: 'full' },*/
  { path: '', component: PartyMainComponent },
  { path: 'add', component: PartyAddComponent },
  { path: 'edit/:id', component: PartyEditComponent },
  { path: 'del/:id', component: PartyDelComponent },
  { path: 'ship/:id', component: ShipMainComponent },
  { path: 'ship/:id/add', component: ShipAddComponent },
  { path: 'ship/:id/edit/:shipId', component: ShipEditComponent },
  { path: 'ship/:id/del/:shipId', component: ShipDelComponent },
];


@NgModule({
  declarations: [
    PartyComponent,
    PartyMainComponent,
    PartyAddComponent,
    PartyDelComponent,
    PartyEditComponent,
    PartyItemComponent,
    ClientComponent,
    ShipMainComponent,
    ShipAddComponent,
    ShipDelComponent,
    ShipEditComponent,
    ShipItemComponent,
    PartyInfoComponent,
    ShipPrintComponent,
  ],
  exports: [
    PartyComponent,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild(routes),
  ]
})
export class PartyModule { }
