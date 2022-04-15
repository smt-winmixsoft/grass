import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { Party, urlToPartyType } from '../party.model';
import { abort, AbortError } from 'app/utils/common';
import { PartyItemComponent } from '../components/party-item/party-item.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-party-edit',
  templateUrl: './party-edit.component.html',
  styleUrls: ['./party-edit.component.scss']
})
export class PartyEditComponent implements OnInit {

  @ViewChild('party') party: PartyItemComponent;

  public item: Party = new Party();

  partyType: number = 0;

  constructor(route: ActivatedRoute, private router: Router, private http: HttpClient, private location: Location) {
    this.item = new Party()

    this.partyType = urlToPartyType(router.url);

    route.params.subscribe(params => {
      this.item.partyId = params['id'];
    });
  }

  ngOnInit(): void {
    this.http.get<any>(environment.urlApi + 'Party/' + this.item.partyId)
      .subscribe({
        next: (result) => this.item = result,
        error: console.error
      });
  }

  save() {
    this.http.put<any>(environment.urlApi + 'Party/' + this.item.partyId, this.item)
      .subscribe({
        next: () => this.location.back(),
        error: console.error
      });
  }

  async onSubmit() {
    try {
      let ok = await this.party.check();
      if (!ok)
        abort();
      this.save();
    }
    catch (e) {
      if (!(e instanceof AbortError))
        throw e;
    }
  }
}
