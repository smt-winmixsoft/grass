import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Party, getRootUrl, urlToPartyType } from '../../party.model';
import { concatMap, tap } from 'rxjs/operators';
import { environment } from "environments/environment"

@Component({
  selector: 'app-ship-main',
  templateUrl: './ship-main.component.html',
  styleUrls: ['./ship-main.component.scss']
})
export class ShipMainComponent implements OnInit {

  partyType: number;
  baseLink: string;

  partyId: number;
  party: Party;

  constructor(private http: HttpClient, route: ActivatedRoute, router: Router) {
    this.partyType = urlToPartyType(router.url);
    this.baseLink = getRootUrl(this.partyType);

    route.params
      .pipe(
        tap(params => { this.partyId = params['id']; }),

        // Get party
        concatMap(() => this.http.get<Party>(environment.urlApi + 'Party/' + this.partyId)),
        tap({
          next: (result) => this.party = result,
          error: console.error
        }),
      )
      .subscribe();
  }

  ngOnInit(): void {

  }
}
