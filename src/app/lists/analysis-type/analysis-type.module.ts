import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { AnalysisTypeComponent } from './analysis-type.component';
import { AnalysisTypeMainComponent } from './main/analysis-type-main.component';
import { AnalysisTypeAddComponent } from './add/analysis-type-add.component';
import { AnalysisTypeDelComponent } from './del/analysis-type-del.component';
import { AnalysisTypeEditComponent } from './edit/analysis-type-edit.component';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

export const routes: Routes = [
  /*{ path: '', redirectTo: 'main', pathMatch: 'full' },*/
  { path: '', component: AnalysisTypeMainComponent },
  { path: 'add', component: AnalysisTypeAddComponent },
  { path: 'edit/:id', component: AnalysisTypeEditComponent },
  { path: 'del/:id', component: AnalysisTypeDelComponent },
];


@NgModule({
  declarations: [
    AnalysisTypeComponent,
    AnalysisTypeMainComponent,
    AnalysisTypeAddComponent,
    AnalysisTypeDelComponent,
    AnalysisTypeEditComponent,
  ],
  exports: [
    AnalysisTypeComponent,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild(routes),
  ]
})
export class AnalysisTypeModule { }
