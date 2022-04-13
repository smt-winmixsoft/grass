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

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


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
export class BtwModule { }
