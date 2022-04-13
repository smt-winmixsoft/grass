import { Component, OnInit } from '@angular/core';
import { environment } from "environments/environment"
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { AnalysisType } from '../analysis-type.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-analysis-type-add',
  templateUrl: './analysis-type-add.component.html',
  styleUrls: ['./analysis-type-add.component.scss']
})
export class AnalysisTypeAddComponent implements OnInit {

  public item: AnalysisType = new AnalysisType();

  constructor(private router: Router, private http: HttpClient, private translate: TranslateService) {
    translate.get('ANALYSIS_TYPE.NEW').subscribe((res: string) => this.item.name = res);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.http.post<any>(environment.urlApi + 'AnalysisType/', this.item)
      .subscribe({
        next: () => this.router.navigate(['/analysis-type']),
        error: console.error
      });
  }
}
