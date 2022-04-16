import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment"
import { DataTablesResponse } from 'app/utils/common';

import { Client } from '../client.model';

import { DataTablesService } from 'app/services/datatables.service';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-client-main',
  templateUrl: './client-main.component.html',
  styleUrls: ['./client-main.component.scss']
})
export class ClientMainComponent implements OnInit {

  @ViewChild('table') table: ElementRef;
  dtOptions: DataTables.Settings = {};
  items: Client[] = [];

  constructor(private http: HttpClient, private dataTables: DataTablesService) {}

  onResized(event: ResizedEvent) {
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
            environment.urlApi + 'Client/data',
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
          data: 'name'
        },
        {
          data: 'clientTypeId',
          searchable: false,
        },
        {
          data: 'address',
        },
        {
          data: 'residence',
        },
        {
          title: '',
          data: 'actions',
          searchable: false,
          orderable: false
        },
        {
          data: 'clientId',
          searchable: false,
          orderable: false,
          visible: false
        }
      ]
    };
  }

  getClientType(id: number): string {

    switch (id) {
      case 0:
        return 'LD';
      case 1:
        return 'H';
      case 2:
        return 'I';
      default:
        return '';
    }
  }
}
