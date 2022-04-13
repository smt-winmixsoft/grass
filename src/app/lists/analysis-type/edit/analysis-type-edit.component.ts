import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { AnalysisType } from '../analysis-type.model';

@Component({
  selector: 'app-analysis-type-edit',
  templateUrl: './analysis-type-edit.component.html',
  styleUrls: ['./analysis-type-edit.component.scss']
})
export class AnalysisTypeEditComponent implements OnInit {

  public item: AnalysisType = new AnalysisType();

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
    this.http.put<any>(environment.urlApi + 'AnalysisType/' + this.item.analysisTypeId, this.item)
      .subscribe({
        next: () => this.router.navigate(['/analysis-type']),
        error: console.error
      });
  }
}
