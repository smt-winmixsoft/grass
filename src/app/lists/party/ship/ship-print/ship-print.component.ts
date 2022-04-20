import { Component, OnInit } from '@angular/core';
import { Party, PartyOut, PartyOutList } from '../../party.model';

@Component({
  selector: 'app-ship-print',
  templateUrl: './ship-print.component.html',
  styleUrls: ['./ship-print.component.scss']
})
export class ShipPrintComponent implements OnInit {

  party: Party;
  items: PartyOutList;

  constructor() { }

  ngOnInit(): void {
  }

  init(party: Party, items: PartyOutList) {
    this.party = party;
    this.items = items;
  }
}
