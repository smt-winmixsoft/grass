import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { PackType } from '../pack-type.model';

@Component({
  selector: 'app-pack-type-edit',
  templateUrl: './pack-type-edit.component.html',
  styleUrls: ['./pack-type-edit.component.scss']
})
export class PackTypeEditComponent implements OnInit {

  public item: PackType = new PackType();

  constructor(route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.item = new PackType()
    route.params.subscribe(params => { this.item.packTypeId = params['id']; });
  }

  ngOnInit(): void {
    this.http.get<any>(environment.urlApi + 'PackType/' + this.item.packTypeId)
      .subscribe({
        next: (result) => this.item = result,
        error: console.error
      });
  }

  onSubmit(): void {
    this.http.put<any>(environment.urlApi + 'PackType/' + this.item.packTypeId, this.item)
      .subscribe({
        next: () => this.router.navigate(['/pack-type']),
        error: console.error
      });
  }
}
