import { Component, OnInit } from '@angular/core';
import { environment } from "environments/environment"
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { Material } from '../material.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-material-add',
  templateUrl: './material-add.component.html',
  styleUrls: ['./material-add.component.scss']
})
export class MaterialAddComponent implements OnInit {

  public item: Material = new Material();

  constructor(private router: Router, private http: HttpClient, private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.translate.get('MATERIAL.NEW').subscribe((res: string) => this.item.name = res);
    this.http.get<any>(environment.urlApi + 'AnalysisType')
      .subscribe({
        next: (result) => this.item.initFromAnalyses(result),
        error: console.error
      });
  }

  onSubmit(): void {
    this.http.post<any>(environment.urlApi + 'Material/', this.item.getForSave())
      .subscribe({
        next: () => this.router.navigate(['/material']),
        error: console.error
      });
  }
}
