import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "environments/environment"
import { HttpClient } from "@angular/common/http"
import { Price } from '../price.model';

@Component({
  selector: 'app-price-del',
  templateUrl: './price-del.component.html',
  styleUrls: ['./price-del.component.scss']
})
export class PriceDelComponent implements OnInit {
  public item: Price;

  constructor(route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.item = new Price()
    route.params.subscribe(params => { this.item.priceId = params['id']; });
  }

  ngOnInit(): void {
    this.http.get<any>(environment.urlApi + 'Price/' + this.item.priceId)
      .subscribe({
        next: (result) => this.item = result,
        error: console.error
      });
  }

  onSubmit(): void {
    this.http.delete<any>(environment.urlApi + 'Price/' + this.item.priceId)
      .subscribe({
        next: () => this.router.navigate(['/price']),
        error: console.error
      });
  }
}
