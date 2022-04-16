import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment"
import { DataTablesResponse } from 'app/utils/common';

import { Material } from '../material.model';

import { DataTablesService } from 'app/services/datatables.service';
import { ResizedEvent } from 'angular-resize-event';


@Component({
  selector: 'app-material-main',
  templateUrl: './material-main.component.html',
  styleUrls: ['./material-main.component.scss']
})
export class MaterialMainComponent implements OnInit {

  @ViewChild('table') table: ElementRef;
  dtOptions: DataTables.Settings = {};
  items: Material[] = [];

  constructor(private http: HttpClient, private dataTables: DataTablesService) {
  }

  onResized(event: ResizedEvent) {
    this.table.nativeElement.style.width = this.table.nativeElement.parentElement.style.width;
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: this.dataTables.getSettings(),
      lengthMenu: [10],
      stateSave: true,
      lengthChange: false,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post<DataTablesResponse>(
            environment.urlApi + 'Material/data',
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
          title: '',
          data: 'actions',
          searchable: false,
          orderable: false
        },
        {
          data: 'materialId',
          searchable: false,
          orderable: false,
          visible: false
        }
      ]
    };
  }
}
