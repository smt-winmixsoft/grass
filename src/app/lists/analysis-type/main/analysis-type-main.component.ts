import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment"
import { DataTablesResponse } from 'app/utils/common';

import { AnalysisType } from '../analysis-type.model';

import { DataTablesService } from 'app/services/datatables.service';
import { ResizedEvent } from 'angular-resize-event';


@Component({
  selector: 'app-analysis-type-main',
  templateUrl: './analysis-type-main.component.html',
  styleUrls: ['./analysis-type-main.component.scss']
})
export class AnalysisTypeMainComponent implements OnInit {

  @ViewChild('table') table: ElementRef;
  dtOptions: DataTables.Settings = {};
  items: AnalysisType[] = [];

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
            environment.urlApi + 'AnalysisType/data',
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
          data: 'analysisTypeNumber',
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
          data: 'analysisTypeId',
          searchable: false,
          orderable: false,
          visible: false
        }
      ]
    };
  }
}
