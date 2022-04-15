import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "environments/environment"
import { HttpClient } from "@angular/common/http"
import { Party, urlToPartyType } from '../party.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-party-del',
  templateUrl: './party-del.component.html',
  styleUrls: ['./party-del.component.scss']
})
export class PartyDelComponent implements OnInit {
  public item: Party;
  partyType: number = 0;

  constructor(route: ActivatedRoute, private router: Router, private http: HttpClient, private location: Location) {
    this.item = new Party()
    route.params.subscribe(params => { this.item.partyId = params['id']; });
    this.partyType = urlToPartyType(router.url);
  }

  ngOnInit(): void {
    this.http.get<any>(environment.urlApi + 'Party/' + this.item.partyId)
      .subscribe({
        next: (result) => this.item = result,
        error: console.error
      });
  }

  onSubmit(): void {
    this.http.delete<any>(environment.urlApi + 'Party/' + this.item.partyId)
      .subscribe({
        next: () => this.location.back(),
        error: console.error
      });
  }
}
