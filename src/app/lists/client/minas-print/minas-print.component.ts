import { Component, OnInit } from '@angular/core';
import { Client, ClientMinas } from '../client.model';
import { MinasParams } from '../minas-param/minas-param.component';

@Component({
  selector: 'app-minas-print',
  templateUrl: './minas-print.component.html',
  styleUrls: ['./minas-print.component.scss']
})
export class MinasPrintComponent implements OnInit {

  client: Client;
  date = new Date();
  params: MinasParams;
  parties: ClientMinas[];

  constructor() { }

  ngOnInit(): void {
  }

  init(params: MinasParams, client: Client, parties: ClientMinas[]) {
    this.params = params;
    this.client = client;
    this.parties = parties;
  }

  totalProduct(): number {
    let total = 0;
    this.parties?.forEach(x => total += x.dryProduct);
    return total;
  }

  totalValue1(): number {
    let total = 0;
    this.parties?.forEach(x => total += x.value1);
    return total;
  }

  totalValue2(): number {
    let total = 0;
    this.parties?.forEach(x => total += x.value2);
    return total;
  }
}
