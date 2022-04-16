import { NgModule } from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import { BtwComponent } from './btw.component';
import { BtwMainComponent } from './main/btw-main.component';
import { BtwAddComponent } from './add/btw-add.component';
import { BtwDelComponent } from './del/btw-del.component';
import { BtwEditComponent } from './edit/btw-edit.component';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

export const routes: Routes = [
  /*{ path: '', redirectTo: 'main', pathMatch: 'full' },*/
  { path: '', component: BtwMainComponent },
  { path: 'add', component: BtwAddComponent },
  { path: 'edit/:id', component: BtwEditComponent },
  { path: 'del/:id', component: BtwDelComponent },
];


@NgModule({
  declarations: [
    BtwComponent,
    BtwMainComponent,
    BtwAddComponent,
    BtwDelComponent,
    BtwEditComponent,
  ],
  exports: [
    BtwComponent,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild(routes),
  ]
})
export class BtwModule { }
