import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { MaterialComponent } from './material.component';
import { MaterialMainComponent } from './main/material-main.component';
import { MaterialAddComponent } from './add/material-add.component';
import { MaterialDelComponent } from './del/material-del.component';
import { MaterialEditComponent } from './edit/material-edit.component';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

export const routes: Routes = [
  { path: '', component: MaterialMainComponent },
  { path: 'add', component: MaterialAddComponent },
  { path: 'edit/:id', component: MaterialEditComponent },
  { path: 'del/:id', component: MaterialDelComponent },
];

@NgModule({
  declarations: [
    MaterialComponent,
    MaterialMainComponent,
    MaterialAddComponent,
    MaterialDelComponent,
    MaterialEditComponent,
  ],
  exports: [
    MaterialComponent,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild(routes),
  ]
})
export class MaterialModule { }
