import { Component, HostListener, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment"
import { Client } from './client.model';
import { DataTablesResponse } from 'app/utils/common';

import { DataTablesService } from 'app/services/datatables.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  @Input() clientType: number = 0;
  @Output() closeEvent = new EventEmitter<number>();
  @ViewChild('table') table: ElementRef;
  dtOptions: DataTables.Settings = {};
  items: Client[] = [];

  constructor(private http: HttpClient, private dataTables: DataTablesService) {}

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
            environment.urlApi + 'Client/dataByType/' + this.clientType,
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

  choose(id: number) {
    this.closeEvent.emit(id);
  }
}
