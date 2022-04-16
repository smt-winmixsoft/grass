import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { PackTypeComponent } from './pack-type.component';
import { PackTypeMainComponent } from './main/pack-type-main.component';
import { PackTypeAddComponent } from './add/pack-type-add.component';
import { PackTypeDelComponent } from './del/pack-type-del.component';
import { PackTypeEditComponent } from './edit/pack-type-edit.component';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

export const routes: Routes = [
  /*{ path: '', redirectTo: 'main', pathMatch: 'full' },*/
  { path: '', component: PackTypeMainComponent },
  { path: 'add', component: PackTypeAddComponent },
  { path: 'edit/:id', component: PackTypeEditComponent },
  { path: 'del/:id', component: PackTypeDelComponent },
];


@NgModule({
  declarations: [
    PackTypeComponent,
    PackTypeMainComponent,
    PackTypeAddComponent,
    PackTypeDelComponent,
    PackTypeEditComponent,
  ],
  exports: [
    PackTypeComponent,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild(routes),
  ]
})
export class PackTypeModule { }
