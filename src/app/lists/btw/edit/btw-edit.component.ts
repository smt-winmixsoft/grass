import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { Btw } from '../btw.model';

@Component({
  selector: 'app-btw-edit',
  templateUrl: './btw-edit.component.html',
  styleUrls: ['./btw-edit.component.scss']
})
export class BtwEditComponent implements OnInit {

  public item: Btw = new Btw();

  constructor(route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.item = new Btw()
    route.params.subscribe(params => { this.item.btwId = params['id']; });
  }

  ngOnInit(): void {
    this.http.get<any>(environment.urlApi + 'Btw/' + this.item.btwId)
      .subscribe({
        next: (result) => this.item = result,
        error: console.error
      });
  }

  onSubmit(): void {
    this.http.put<any>(environment.urlApi + 'Btw/' + this.item.btwId, this.item)
      .subscribe({
        next: () => this.router.navigate(['/btw']),
        error: console.error
      });
  }
}
