import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Party } from '../../party.model';

@Component({
  selector: 'app-party-info',
  templateUrl: './party-info.component.html',
  styleUrls: ['./party-info.component.scss']
})
export class PartyInfoComponent implements OnInit {

  @Input() party: Party;

  constructor() { }

  ngOnInit(): void {
  }

  getDate() {
    return (new Date(this.party.inDate)).toLocaleDateString();
  }

}
