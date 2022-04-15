import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Party, PartyOut, PARTY_DRYING, urlToPartyType } from '../../party.model';
import { concatMap, tap } from 'rxjs/operators';
import { environment } from "environments/environment"

@Component({
  selector: 'app-ship-main',
  templateUrl: './ship-main.component.html',
  styleUrls: ['./ship-main.component.scss']
})
export class ShipMainComponent implements OnInit {

  partyId: number;
  party: Party;
  items: PartyOut[];
  isButtons: boolean;
  totalOut: number = 0;
  totalIn: number = 0;
  totalDiff: number = 0;
  isSold: boolean = false;

  constructor(private http: HttpClient, route: ActivatedRoute, router: Router) {

    this.isButtons = true;
    const isDrying = urlToPartyType(router.url) == PARTY_DRYING;
    var total: number = 0;

    route.params
      .pipe(
        tap(params => { this.partyId = params['id']; }),

        // Get party
        concatMap(() => this.http.get<Party>(environment.urlApi + 'Party/' + this.partyId)),
        tap({
          next: (result) => {
            this.party = result;
            this.totalIn = this.party.dryProduct * this.party.dryPrice / 100;
          },
          error: console.error
        }),

        // Get party out
        concatMap(() => this.http.get<PartyOut[]>(environment.urlApi + 'PartyOut/byParty/' + this.partyId)),
        tap({
          next: (result) => {
            this.items = result
            this.items.forEach(x => {
              this.totalOut += this.getTotal(x);
              total += x.product;
            });

            this.isSold = total >= this.party.dryProduct;
            this.totalDiff = this.totalOut - this.totalIn;
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
}
