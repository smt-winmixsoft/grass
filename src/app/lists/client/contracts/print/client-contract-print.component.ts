import { Component, OnInit } from '@angular/core';
import { Client } from '@components/client-info/client.model';

@Component({
  selector: 'app-client-contract-print',
  templateUrl: './client-contract-print.component.html',
  styleUrls: ['./client-contract-print.component.scss']
})
export class ClientContractPrintComponent implements OnInit {

  client: Client;
  date: Date;

  constructor() { }

  ngOnInit(): void {
  }

  init(client: Client, date: Date) {
    this.client = client;
    this.date = date;
  }
}
