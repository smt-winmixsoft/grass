import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "environments/environment"
import { HttpClient } from "@angular/common/http"
import { Material } from '../material.model';

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.component.html',
  styleUrls: ['./material-edit.component.scss']
})
export class MaterialEditComponent implements OnInit {

  public item: Material = new Material();

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => { this.item.materialId = params['id']; });

    this.http.get<any>(environment.urlApi + 'Material/' + this.item.materialId)
      .subscribe({
        next: (result) => this.item.initFromMaterial(result),
        error: console.error
      });
  }

  onSubmit(): void {
    this.http.put<any>(environment.urlApi + 'Material/' + this.item.materialId, this.item.getForSave())
      .subscribe({
        next: () => this.router.navigate(['/material']),
        error: console.error
      });
  }
}
