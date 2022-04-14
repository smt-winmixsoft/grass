import { Component, OnInit, Input } from '@angular/core';
import { PackType, PartyOut, Party } from '../../party.model';
import { environment } from "environments/environment"
import { HttpClient } from "@angular/common/http"
import { ActivatedRoute, Router } from '@angular/router';
import { getRootUrl, urlToPartyType } from '../../party.model';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ship-item',
  templateUrl: './ship-item.component.html',
  styleUrls: ['./ship-item.component.scss']
})
export class ShipItemComponent implements OnInit {

  @Input() isNew: boolean;
  item: PartyOut;
  party: Party;

  partyType: number;
  baseLink: string;

  packTypes: PackType[];

  constructor(private http: HttpClient, private route: ActivatedRoute, router: Router) {
    this.partyType = urlToPartyType(router.url);
    this.baseLink = getRootUrl(this.partyType);
  }

  ngOnInit(): void {

    this.http.get<PackType[]>(environment.urlApi + 'PackType')
      .subscribe({
        next: res => this.packTypes = res,
        error: console.error
      });

    var partyId: number;
    this.route.params
      .pipe(
        tap(params => {
          partyId = params['id'];
          if (!this.isNew) {
            this.http.get<PartyOut>(environment.urlApi + 'PartyOut/' + params['shipId']).subscribe({
              next: (res) => this.item = res,
              error: console.error
            })
          }
          else
          {
            this.item = new PartyOut();
            this.item.partyId = partyId;
          }
        }),

        // Get party
        concatMap(() => this.http.get<Party>(environment.urlApi + 'Party/' + partyId)),
        tap({
          next: (result) => {
            this.party = result;
            this.item.packTypeId = this.party.packTypeId;
          },
          error: console.error
        }),
      )
      .subscribe();
  }

  setDate($event) {
    this.item.outDate = new Date($event);
  }
}
