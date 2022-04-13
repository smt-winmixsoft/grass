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

import { PartyComponent } from './party.component';
import { PartyMainComponent } from './main/party-main.component';
import { PartyAddComponent } from './add/party-add.component';
import { PartyDelComponent } from './del/party-del.component';
import { PartyEditComponent } from './edit/party-edit.component';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { PartyItemComponent } from './components/party-item/party-item.component';


export const routes: Routes = [
  /*{ path: '', redirectTo: 'main', pathMatch: 'full' },*/
  { path: '', component: PartyMainComponent },
  { path: 'add', component: PartyAddComponent },
  { path: 'edit/:id', component: PartyEditComponent },
  { path: 'del/:id', component: PartyDelComponent },
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    PartyComponent,
    PartyMainComponent,
    PartyAddComponent,
    PartyDelComponent,
    PartyEditComponent,
    PartyItemComponent,
  ],
  exports: [
    PartyComponent,
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
export class PartyModule { }
