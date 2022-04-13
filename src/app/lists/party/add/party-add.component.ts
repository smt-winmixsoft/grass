import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from "environments/environment"
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { Party, forSave, urlToPartyType, getRootUrl } from '../party.model';
import { abort, AbortError } from 'app/utils/common';
import { PartyItemComponent } from '../components/party-item/party-item.component';

@Component({
  selector: 'app-party-add',
  templateUrl: './party-add.component.html',
  styleUrls: ['./party-add.component.scss']
})
export class PartyAddComponent implements OnInit {

  @ViewChild('party') party: PartyItemComponent;

  public item: Party = new Party();

  partyType: number = 0;
  baseLink: string;

  constructor(private router: Router, private http: HttpClient) {
    this.partyType = urlToPartyType(router.url);
    this.baseLink = getRootUrl(this.partyType);
  }

  ngOnInit(): void {
    this.item.partyType = 0;
  }

  save(): void {
    this.http.post<any>(environment.urlApi + 'Party/', forSave(this.item))
      .subscribe({
        next: () => this.router.navigate([this.baseLink]),
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
