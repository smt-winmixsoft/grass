import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment"
import { DataTablesResponse } from 'app/utils/common';

import { Probe } from '../probe.model';

import { DataTablesService } from 'app/services/datatables.service';
import { ResizedEvent } from 'angular-resize-event';


@Component({
  selector: 'app-probe-main',
  templateUrl: './probe-main.component.html',
  styleUrls: ['./probe-main.component.scss']
})
export class ProbeMainComponent implements OnInit {

  @ViewChild('table') table: ElementRef;
  dtOptions: DataTables.Settings = {};
  items: Probe[] = [];

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
            environment.urlApi + 'Probe/data',
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
          data: 'price',
          searchable: false,
          orderable: false
        },
        {
          title: '',
          data: 'actions',
          searchable: false,
          orderable: false
        },
        {
          data: 'probeId',
          searchable: false,
          orderable: false,
          visible: false
        }
      ]
    };
  }
}
