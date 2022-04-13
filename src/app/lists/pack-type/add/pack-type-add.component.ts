import { Component, OnInit } from '@angular/core';
import { environment } from "environments/environment"
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { PackType } from '../pack-type.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pack-type-add',
  templateUrl: './pack-type-add.component.html',
  styleUrls: ['./pack-type-add.component.scss']
})
export class PackTypeAddComponent implements OnInit {

  public item: PackType = new PackType();

  constructor(private router: Router, private http: HttpClient, private translate: TranslateService) {
    translate.get('PACK_TYPE.NEW').subscribe((res: string) => this.item.name = res);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.http.post<any>(environment.urlApi + 'PackType/', this.item)
      .subscribe({
        next: () => this.router.navigate(['/pack-type']),
        error: console.error
      });
  }
}
