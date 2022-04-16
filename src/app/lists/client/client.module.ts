import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { ClientComponent } from './client.component';
import { ClientMainComponent } from './main/client-main.component';
import { ClientAddComponent } from './add/client-add.component';
import { ClientDelComponent } from './del/client-del.component';
import { ClientEditComponent } from './edit/client-edit.component';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { ClientItemComponent } from './item/client-item.component';
import { ClientContractsComponent } from './contracts/client-contracts.component';


export const routes: Routes = [
  /*{ path: '', redirectTo: 'main', pathMatch: 'full' },*/
  { path: '', component: ClientMainComponent },
  { path: 'add', component: ClientAddComponent },
  { path: 'edit/:id', component: ClientEditComponent },
  { path: 'del/:id', component: ClientDelComponent },
  { path: 'contracts/:id', component: ClientContractsComponent },
];


@NgModule({
  declarations: [
    ClientComponent,
    ClientMainComponent,
    ClientAddComponent,
    ClientDelComponent,
    ClientEditComponent,
    ClientItemComponent,
    ClientContractsComponent,
  ],
  exports: [
    ClientComponent,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild(routes),
  ]
})
export class ClientModule { }
