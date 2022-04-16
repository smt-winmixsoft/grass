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

import { ClientComponent } from './client.component';
import { ClientMainComponent } from './main/client-main.component';
import { ClientAddComponent } from './add/client-add.component';
import { ClientDelComponent } from './del/client-del.component';
import { ClientEditComponent } from './edit/client-edit.component';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { ClientItemComponent } from './item/client-item.component';


export const routes: Routes = [
  /*{ path: '', redirectTo: 'main', pathMatch: 'full' },*/
  { path: '', component: ClientMainComponent },
  { path: 'add', component: ClientAddComponent },
  { path: 'edit/:id', component: ClientEditComponent },
  { path: 'del/:id', component: ClientDelComponent },
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    ClientComponent,
    ClientMainComponent,
    ClientAddComponent,
    ClientDelComponent,
    ClientEditComponent,
    ClientItemComponent,
  ],
  exports: [
    ClientComponent,
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
export class ClientModule { }
