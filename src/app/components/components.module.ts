import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DataTablesModule } from 'angular-datatables';

import { TitleComponent } from './title/title.component';
import { ListComponent } from './list/list.component';
import { MessageComponent } from './message/message.component';
import { EditorComponent } from './editor/editor.component';
import { ClientsComponent } from './clients/clients.component';

import { AngularResizeEventModule } from 'angular-resize-event';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    TitleComponent,
    ListComponent,
    MessageComponent,
    ClientsComponent,
    EditorComponent
  ],
  exports: [
    TitleComponent,
    ListComponent,
    MessageComponent,
    ClientsComponent,
    EditorComponent,
    NgbModule
  ],
  imports: [
    RouterModule,
    DataTablesModule,
    CommonModule,
    AngularResizeEventModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ]
})
export class ComponentsModule { }
