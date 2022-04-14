import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { getRootUrl, urlToPartyType } from '../../party.model';

@Component({
  selector: 'app-ship-edit',
  templateUrl: './ship-edit.component.html',
  styleUrls: ['./ship-edit.component.scss']
})
export class ShipEditComponent implements OnInit {

  partyType: number;
  baseLink: string;

  partyId: number;
  shipId: number;

  constructor(private http: HttpClient, route: ActivatedRoute, router: Router) {
    this.partyType = urlToPartyType(router.url);
    this.baseLink = getRootUrl(this.partyType);

    route.params.subscribe(params => {
      this.partyId = params['id'];
      this.shipId = params['shipId'];
    });
  }

  ngOnInit(): void {
  }

}
