import { Component, OnInit } from '@angular/core';
import { ClientContract } from '../client.model';
import { Client } from '@components/client-info/client.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { concatMap, tap } from 'rxjs/operators';
import { environment } from "environments/environment"

@Component({
  selector: 'app-client-contracts',
  templateUrl: './client-contracts.component.html',
  styleUrls: ['./client-contracts.component.scss']
})
export class ClientContractsComponent implements OnInit {

  items: ClientContract[];
  client: Client;

  constructor(private http: HttpClient, route: ActivatedRoute) {

    var clientId: number;

    route.params
      .pipe(
        tap(params => { clientId = parseInt(params['id']); }),

        // Get client
        concatMap(() => this.http.get<Client>(environment.urlApi + 'Client/' + clientId)),
        tap({
          next: (result) => this.client = result,
          error: console.error
        }),

        // Get contracts
        concatMap(() => this.http.get<ClientContract[]>(environment.urlApi + 'ClientContract/byClient/' + clientId)),
        tap({
          next: (result) => this.items = result,
          error: console.error
        }),
      )
      .subscribe();
  }

  ngOnInit(): void {
  }

  add(): void {

  }

}
