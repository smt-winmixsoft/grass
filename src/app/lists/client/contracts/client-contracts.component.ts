import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientContract, sortContact, delContact, getContact } from '../client.model';
import { Client } from '@components/client-info/client.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { concatMap, tap } from 'rxjs/operators';
import { environment } from "environments/environment"
import { MessageComponent, AskInfo, AskResult } from '@components/message/message.component';
import { ClientInfoComponent } from '@components/client-info/client-info.component';

@Component({
  selector: 'app-client-contracts',
  templateUrl: './client-contracts.component.html',
  styleUrls: ['./client-contracts.component.scss']
})
export class ClientContractsComponent implements OnInit {

  @ViewChild('message') message: MessageComponent;
  @ViewChild('clientInfo') clientInfo: ClientInfoComponent;

  items: ClientContract[];
  client: Client;

  tag_delete: number = 1;

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
    this.http.get<number>(environment.urlApi + 'ClientContract/maxYear/' + this.client.clientId).subscribe({
      next: (year) => {
        var item: ClientContract = new ClientContract();
        item.clientId = this.client.clientId;
        item.contractYear = year;

        this.http.post<ClientContract>(environment.urlApi + 'ClientContract/', item).subscribe({
          next: (result) => {
            this.items.push(result);
            sortContact(this.items);
          },
          error: console.error
        });
      },
      error: console.error
    });
  }

  send(id: number): void {
    let item = getContact(this.items, id);
    this.http.put<ClientContract>(environment.urlApi + 'ClientContract/send/' + id, item).subscribe({
      next: (result) => {
        item.contractState = result.contractState;
        item.sendDate = result.sendDate;
        item.signDate = result.signDate;
        this.clientInfo.checkContract();
      },
      error: console.error
    });
  }

  sign(id: number): void {
    let item = getContact(this.items, id);
    this.http.put<ClientContract>(environment.urlApi + 'ClientContract/sign/' + id, item).subscribe({
      next: (result) => {
        item.contractState = result.contractState;
        item.signDate = result.signDate;
        this.clientInfo.checkContract();
      },
      error: console.error
    });
  }

  del(id: number): void {
    this.message.ask({
      tag: this.tag_delete,
      message: 'CONTRACT.ERROR.ISDELETE',
      isDelete: true,
      data: id
    } as AskInfo);
  }

  answerEvent(result: AskResult) {

    if (result.answer > 0) return;

    switch (result.tag) {
      case this.tag_delete:
        this.http.delete<any>(environment.urlApi + 'ClientContract/' + result.data).subscribe({
          next: () => {
            delContact(this.items, result.data);
            this.clientInfo.checkContract();
          },
          error: console.error
        });
        break;
    }
  }
}
