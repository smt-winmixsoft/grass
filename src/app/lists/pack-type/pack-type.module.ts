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

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


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
export class PackTypeModule { }
