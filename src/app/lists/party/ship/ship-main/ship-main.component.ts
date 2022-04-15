import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Party, PartyOut } from '../../party.model';
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

  constructor(private http: HttpClient, route: ActivatedRoute, router: Router) {

    route.params
      .pipe(
        tap(params => { this.partyId = params['id']; }),

        // Get party
        concatMap(() => this.http.get<Party>(environment.urlApi + 'Party/' + this.partyId)),
        tap({
          next: (result) => this.party = result,
          error: console.error
        }),

        // Get party out
        concatMap(() => this.http.get<PartyOut[]>(environment.urlApi + 'PartyOut/byParty/' + this.partyId)),
        tap({
          next: (result) => this.items = result,
          error: console.error
        }),

      )
      .subscribe();
  }

  ngOnInit(): void {

  }

  getTotal(item: PartyOut) {
    return (item?.price * item?.product)/100;
  }
}
