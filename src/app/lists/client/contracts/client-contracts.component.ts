import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ClientContract, ClientContractList, ContractState } from '../client.model';
import { Client } from '@components/client-info/client.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { concatMap, tap } from 'rxjs/operators';
import { environment } from "environments/environment"
import { MessageComponent, AskInfo, AskResult } from '@components/message/message.component';
import { ClientInfoComponent } from '@components/client-info/client-info.component';
import { ClientContractPrintComponent } from './print/client-contract-print.component';
import { doPrint } from 'app/utils/common';

@Component({
  selector: 'app-client-contracts',
  templateUrl: './client-contracts.component.html',
  styleUrls: ['./client-contracts.component.scss']
})
export class ClientContractsComponent implements OnInit {

  @ViewChild('message') message: MessageComponent;
  @ViewChild('clientInfo') clientInfo: ClientInfoComponent;
  @ViewChild('contract') contract: ClientContractPrintComponent;

  items = new ClientContractList();
  client: Client;

  tag_delete: number = 1;

  isPrint: boolean = true;

  constructor(private http: HttpClient, route: ActivatedRoute, private zone: NgZone) {

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
        concatMap(() => this.http.get<ClientContractList>(environment.urlApi + 'ClientContract/byClient/' + clientId)),
        tap({
          next: (result) => Object.assign(this.items, result),
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
            this.items.resort();
          },
          error: console.error
        });
      },
      error: console.error
    });
  }

  state(id: number, state: number): void {
    let item = this.items.get(id);
    this.http.put<ClientContract>(environment.urlApi + `ClientContract/state/${id}/${state}`, item).subscribe({
      next: (result) => {
        Object.assign(item, result);
        this.clientInfo.checkContract();
      },
      error: (result) => {
        console.error(result);

        var msg: string = null;
        switch (result?.error) {
          case 100: //ERR_NO_MAIL
            msg = "CLIENT.ERROR.NOMAIL";
            break;
          case 101: //ERR_SEND
            msg = "CONTRACT.ERROR.SEND";
            break;
          case 102: //ERR_NO_CLIENT
            msg = "CONTRACT.ERROR.NOCLIENT";
            break;
          default:
            msg = "ERROR.UNKNOWN";
            break;
        }

        this.message.show("", msg, null, result?.error);
      }
    });
  }

  send(id: number): void {
    this.state(id, ContractState.SEND);
  }

  sign(id: number): void {
    this.state(id, ContractState.SIGN);
  }

  unsign(id: number): void {
    this.state(id, ContractState.UNSIGN);
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
            this.items.del(result.data);
            this.clientInfo.checkContract();
          },
          error: console.error
        });
        break;
    }
  }

  print(id: number) {
    this.isPrint = true;
    this.state(id, ContractState.PRINT);
    doPrint(this.zone, () => this.contract.init(this.client, this.items.get(id).inDate));
  }
}
