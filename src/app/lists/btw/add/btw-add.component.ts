import { Component, OnInit } from '@angular/core';
import { environment } from "environments/environment"
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { Btw } from '../btw.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-btw-add',
  templateUrl: './btw-add.component.html',
  styleUrls: ['./btw-add.component.scss']
})
export class BtwAddComponent implements OnInit {

  public item: Btw = new Btw();

  constructor(private router: Router, private http: HttpClient, private translate: TranslateService) {
    translate.get('BTW.NEW').subscribe((res: string) => this.item.name = res);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.http.post<any>(environment.urlApi + 'Btw/', this.item)
      .subscribe({
        next: () => this.router.navigate(['/btw']),
        error: console.error
      });
  }
}
