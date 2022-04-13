import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "environments/environment"
import { HttpClient } from "@angular/common/http"
import { Client } from '../client.model';

@Component({
  selector: 'app-client-del',
  templateUrl: './client-del.component.html',
  styleUrls: ['./client-del.component.scss']
})
export class ClientDelComponent implements OnInit {
  public item: Client;

  constructor(route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.item = new Client()
    route.params.subscribe(params => { this.item.clientId = params['id']; });
  }

  ngOnInit(): void {
    this.http.get<any>(environment.urlApi + 'Client/' + this.item.clientId)
      .subscribe({
        next: (result) => this.item = result,
        error: console.error
      });
  }

  onSubmit(): void {
    this.http.delete<any>(environment.urlApi + 'Client/' + this.item.clientId)
      .subscribe({
        next: () => this.router.navigate(['/client']),
        error: console.error
      });
  }
}
