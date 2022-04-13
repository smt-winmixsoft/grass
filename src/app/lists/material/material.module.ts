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

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


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
export class MaterialModule { }
