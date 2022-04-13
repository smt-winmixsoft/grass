import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ]
})
export class AnalysisTypeModule { }
