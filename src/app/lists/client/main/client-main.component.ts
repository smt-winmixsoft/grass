import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment"
import { DataTablesResponse, doAfter } from 'app/utils/common';

import { ClientList, ClientMinas } from '../client.model';

import { DataTablesService } from 'app/services/datatables.service';
import { ResizedEvent } from 'angular-resize-event';
import { MinasPrintComponent } from '../minas-print/minas-print.component';

import { doPrint, doAssign } from 'app/utils/common';
import { MinasParamComponent, MinasParams } from '../minas-param/minas-param.component';

import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-client-main',
  templateUrl: './client-main.component.html',
  providers: [DatePipe],
  styleUrls: ['./client-main.component.scss']
})
export class ClientMainComponent implements OnInit {

  @ViewChild('table') table: ElementRef;
  @ViewChild('minas') minas: MinasPrintComponent;
  @ViewChild('minasParam') minasParam: MinasParamComponent;

  dtOptions: DataTables.Settings = {};
  items = new ClientList();
  isPrint: boolean = false;
  isMinas: boolean = false;

  constructor(private http: HttpClient, private dataTables: DataTablesService, private zone: NgZone, public datepipe: DatePipe) { }

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
            this.items = doAssign(ClientList, resp.data);
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

  minasResult(params: MinasParams) {
    if (params.result === 0) {
      this.isPrint = true;

      let dateFrom = this.datepipe.transform(params.dateBegin, 'yyyy-MM-dd');
      let dateTo = this.datepipe.transform(params.dateEnd, 'yyyy-MM-dd');
      var parties: ClientMinas[];

      this.http.get<ClientMinas[]>(environment.urlApi + `Client/minas/${params.clientId}/${dateFrom}/${dateTo}`)
        .subscribe({
          next: (result) => {
            parties = result;
            doPrint(this.zone, () => {
              this.minas.init(params, this.items.get(params.clientId), result);
            });
          },
          error: console.error
        });
    }
  }

  print(id: number) {
    this.isMinas = true;
    doAfter(this.zone, () => {
      this.minasParam.show(id);
    });
  }
}
