import { Component, Input, OnInit } from '@angular/core';
import { Client } from '@components/client-info/client.model';

@Component({
  selector: 'app-client-contract-print',
  templateUrl: './client-contract-print.component.html',
  styleUrls: ['./client-contract-print.component.scss']
})
export class ClientContractPrintComponent implements OnInit {

  @Input() printId: number;
  @Input() client: Client;
  date = new Date();

  constructor() { }

  ngOnInit(): void {
  }
}
