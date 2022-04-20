import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Party, PartyOut, PartyOutList, PARTY_DRYING, urlToPartyType } from '../../party.model';
import { concatMap, tap } from 'rxjs/operators';
import { environment } from "environments/environment"
import { doPrint, doAssign } from 'app/utils/common';
import { ShipPrintComponent } from '../ship-print/ship-print.component';

@Component({
  selector: 'app-ship-main',
  templateUrl: './ship-main.component.html',
  styleUrls: ['./ship-main.component.scss']
})
export class ShipMainComponent implements OnInit {

  @ViewChild('print') cmpPrint: ShipPrintComponent;

  partyId: number;
  party: Party;
  items: PartyOutList;
  isButtons: boolean;
  isPrint: boolean = false;

  constructor(private http: HttpClient, route: ActivatedRoute, router: Router, private zone: NgZone) {

    this.isButtons = true;
    const isDrying = urlToPartyType(router.url) == PARTY_DRYING;

    route.params
      .pipe(
        tap(params => { this.partyId = params['id']; }),

        // Get party
        concatMap(() => this.http.get<Party>(environment.urlApi + 'Party/' + this.partyId)),
        tap({
          next: (result) => this.party = doAssign(Party, result),
          error: console.error
        }),

        // Get party out
        concatMap(() => this.http.get<PartyOutList>(environment.urlApi + 'PartyOut/byParty/' + this.partyId)),
        tap({
          next: (result) => {
            this.items = doAssign(PartyOutList, result);
            this.items.party = this.party;
            if (isDrying)
              this.isButtons = this.items.length == 0;
          },
          error: console.error
        }),

      )
      .subscribe();
  }

  ngOnInit(): void {

  }

  getTotal(item: PartyOut) {
    return (item?.price * item?.product) / 100;
  }

  print() {
    this.isPrint = true;
    doPrint(this.zone, () => {
      this.cmpPrint.init(this.party, this.items);
    });
  }
}
