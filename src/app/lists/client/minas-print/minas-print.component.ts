import { Component, OnInit } from '@angular/core';
import { Client, Party } from '../client.model';
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
  parties: Party[];

  constructor() { }

  ngOnInit(): void {
  }

  init(params: MinasParams, client: Client, parties: Party[]) {
    this.params = params;
    this.client = client;
    this.parties = parties;
  }
}
