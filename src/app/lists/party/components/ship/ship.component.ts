import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from "environments/environment"

import { Party, Client, PackType, CLIENT_I, PartyOut, sortPartyOut } from '../../party.model';


@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss']
})
export class ShipComponent implements OnInit {

  @Output() closeEditor = new EventEmitter()
  @Input() packTypes: PackType[];
  @Input() party: Party;

  isMain: boolean = true;
  isClientEditor: boolean = false;
  isAddEditor: boolean = false;
  clientType: number = CLIENT_I;
  item: PartyOut;
  items: PartyOut[] = [];
  available: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.available = this.party.dryProduct;
  }

  close() {
    this.closeEditor.emit();
  }

  editorCancel() {
    this.isMain = true;
  }

  editorOpen() {
    this.isMain = false;
  }

  clientCancel() {
    this.isClientEditor = false;
    this.editorCancel();
  }

  clientOpen() {
    this.isClientEditor = true;
    this.editorOpen();
  }

  addCancel() {
    this.isAddEditor = false;
    this.editorCancel();
  }

  addOk() {
    this.addCancel();
    this.item.partyOutId = this.items.length;
    this.items.push(this.item);
    this.refreshItems();
  }

  refreshItems() {
    sortPartyOut(this.items);
    this.party.shippedProduct = 0;
    this.items.forEach(i => this.party.shippedProduct += i.product);
    this.available = this.party.dryProduct - this.party.shippedProduct;
  }

  addOpen() {
    this.isAddEditor = true;
    this.item = new PartyOut();
    this.item.packTypeId = this.party.packTypeId;
    this.item.product = this.available;
    this.editorOpen();
  }

  clientSave(id: number) {
    this.clientCancel();
    this.http.get<Client>(environment.urlApi + 'Client/' + id).subscribe({
      next: (result) => {
        this.item.client = result;
        this.item.clientId = result.clientId;
      },
      error: console.error
    });
    this.addOpen();
  }

  setDate($event) {
    this.item.outDate = new Date($event);
  }
}
