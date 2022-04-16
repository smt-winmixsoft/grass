import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

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
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild(routes),
  ]
})
export class PriceModule { }
