import { Component, OnInit } from '@angular/core';
import { environment } from "environments/environment"
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { Price, PackType } from '../price.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-price-add',
  templateUrl: './price-add.component.html',
  styleUrls: ['./price-add.component.scss']
})
export class PriceAddComponent implements OnInit {

  public item: Price = new Price();
  public packTypes: PackType[] = [];

  constructor(private router: Router, private http: HttpClient, private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.translate.get('PRICE.NEW').subscribe((res: string) => this.item.name = res);
    this.http.get<PackType[]>(environment.urlApi + 'PackType')
      .subscribe({
        next: (result) => this.item.initFromPackTypes(result),
        error: console.error
      });
  }

  onSubmit(): void {
    this.http.post<any>(environment.urlApi + 'Price/', this.item.getForSave())
      .subscribe({
        next: () => this.router.navigate(['/price']),
        error: console.error
      });
  }
}
