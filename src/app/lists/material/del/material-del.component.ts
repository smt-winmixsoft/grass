import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "environments/environment"
import { HttpClient } from "@angular/common/http"
import { Material } from '../material.model';

@Component({
  selector: 'app-material-del',
  templateUrl: './material-del.component.html',
  styleUrls: ['./material-del.component.scss']
})
export class MaterialDelComponent implements OnInit {
  public item: Material;

  constructor(route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.item = new Material()
    route.params.subscribe(params => { this.item.materialId = params['id']; });
  }

  ngOnInit(): void {
    this.http.get<any>(environment.urlApi + 'Material/' + this.item.materialId)
      .subscribe({
        next: (result) => this.item = result,
        error: console.error
      });
  }

  onSubmit(): void {
    this.http.delete<any>(environment.urlApi + 'Material/' + this.item.materialId)
      .subscribe({
        next: () => this.router.navigate(['/material']),
        error: console.error
      });
  }
}
