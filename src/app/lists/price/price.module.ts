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

import { PriceComponent } from './price.component';
import { PriceMainComponent } from './main/price-main.component';
import { PriceAddComponent } from './add/price-add.component';
import { PriceDelComponent } from './del/price-del.component';
import { PriceEditComponent } from './edit/price-edit.component';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { PriceListComponent } from './components/price-list/price-list.component';

export const routes: Routes = [
  { path: '', component: PriceMainComponent },
  { path: 'add', component: PriceAddComponent },
  { path: 'edit/:id', component: PriceEditComponent },
  { path: 'del/:id', component: PriceDelComponent },
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    PriceComponent,
    PriceMainComponent,
    PriceAddComponent,
    PriceDelComponent,
    PriceEditComponent,
    PriceListComponent
  ],
  exports: [
    PriceComponent,
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
export class PriceModule { }
