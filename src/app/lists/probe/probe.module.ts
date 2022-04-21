import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { ProbeComponent } from './probe.component';
import { ProbeMainComponent } from './main/probe-main.component';
import { ProbeAddComponent } from './add/probe-add.component';
import { ProbeDelComponent } from './del/probe-del.component';
import { ProbeEditComponent } from './edit/probe-edit.component';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

export const routes: Routes = [
  /*{ path: '', redirectTo: 'main', pathMatch: 'full' },*/
  { path: '', component: ProbeMainComponent },
  { path: 'add', component: ProbeAddComponent },
  { path: 'edit/:id', component: ProbeEditComponent },
  { path: 'del/:id', component: ProbeDelComponent },
];


@NgModule({
  declarations: [
    ProbeComponent,
    ProbeMainComponent,
    ProbeAddComponent,
    ProbeDelComponent,
    ProbeEditComponent,
  ],
  exports: [
    ProbeComponent,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild(routes),
  ]
})
export class ProbeModule { }
