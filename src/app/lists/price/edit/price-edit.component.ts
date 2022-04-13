import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "environments/environment"
import { HttpClient } from "@angular/common/http"
import { PackType, Price } from '../price.model';
import { TranslateService } from '@ngx-translate/core';

import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-price-edit',
  templateUrl: './price-edit.component.html',
  styleUrls: ['./price-edit.component.scss']
})
export class PriceEditComponent implements OnInit {

  public item: Price = new Price();
  public packTypes: PackType[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    translate: TranslateService) {
    translate.get('LABEL.KG').subscribe((res: string) => this.item.labelKg = res);
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap(params => { this.item.priceId = params['id']; }),

        // Get pack types
        concatMap(() => this.http.get<PackType[]>(environment.urlApi + 'PackType')),
        tap({
          next: (result) => this.packTypes = result,
          error: console.error
        }),

        // Get pack prices
        concatMap(() => this.http.get<Price>(environment.urlApi + 'Price/' + this.item.priceId)),
        tap({
          next: (result) => this.item.initFromPrice(result, this.packTypes),
          error: console.error
        }),
      )
      .subscribe();
  }

  onSubmit(): void {
    this.http.put<any>(environment.urlApi + 'Price/' + this.item.priceId, this.item.getForSave())
      .subscribe({
        next: () => this.router.navigate(['/price']),
        error: console.error
      });
  }
}
