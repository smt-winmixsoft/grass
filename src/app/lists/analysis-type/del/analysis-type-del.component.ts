import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "environments/environment"
import { HttpClient } from "@angular/common/http"
import { AnalysisType } from '../analysis-type.model';

@Component({
  selector: 'app-analysis-type-del',
  templateUrl: './analysis-type-del.component.html',
  styleUrls: ['./analysis-type-del.component.scss']
})
export class AnalysisTypeDelComponent implements OnInit {
  public item: AnalysisType;

  constructor(route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.item = new AnalysisType()
    route.params.subscribe(params => { this.item.analysisTypeId = params['id']; });
  }

  ngOnInit(): void {
    this.http.get<any>(environment.urlApi + 'AnalysisType/' + this.item.analysisTypeId)
      .subscribe({
        next: (result) => this.item = result,
        error: console.error
      });
  }

  onSubmit(): void {
    this.http.delete<any>(environment.urlApi + 'AnalysisType/' + this.item.analysisTypeId)
      .subscribe({
        next: () => this.router.navigate(['/analysis-type']),
        error: console.error
      });
  }
}
