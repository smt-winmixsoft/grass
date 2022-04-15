import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment"
import { DataTablesResponse } from 'app/utils/common';

import { Router } from '@angular/router';

import { Party, urlToPartyType, PARTY_DRYING, PARTY_TRADE } from '../party.model';

import { DataTablesService } from 'app/services/datatables.service';

@Component({
  selector: 'app-party-main',
  templateUrl: './party-main.component.html',
  styleUrls: ['./party-main.component.scss']
})
export class PartyMainComponent implements OnInit {

  @ViewChild('table') table: ElementRef;
  dtOptions: DataTables.Settings = {};
  items: Party[] = [];

  partyType: number = 0;
  isDrying: boolean;
  isTrade: boolean;

  constructor(private http: HttpClient, private dataTables: DataTablesService, router: Router) {
    this.partyType = urlToPartyType(router.url);
    this.isDrying = this.partyType == PARTY_DRYING;
    this.isTrade = this.partyType == PARTY_TRADE;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.table.nativeElement.style.width = this.table.nativeElement.parentElement.style.width;
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: this.dataTables.getSettings(),
      lengthMenu: [10],
      lengthChange: false,
      serverSide: true,
      processing: true,
      stateSave: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post<DataTablesResponse>(
            environment.urlApi + 'Party/dataByType/' + this.partyType,
            dataTablesParameters, {}
          ).subscribe(resp => {
            this.items = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        {
          data: 'inDate',
          searchable: false
        },
        {
          data: 'client.name'
        },
        {
          data: 'client.address'
        },
        {
          data: 'client.residence'
        },
        {
          data: 'lotNumber',
          searchable: false,
        },
        {
          data: 'area',
          searchable: false,
        },
        {
          title: '',
          data: 'actions',
          searchable: false,
          orderable: false
        },
        {
          data: 'partyId',
          searchable: false,
          orderable: false,
          visible: false
        }
      ]
    };
  }
}
