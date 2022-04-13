import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Client, ClientRange, ClientType, ClientCheck } from '../../client.model';
import { HttpClient } from "@angular/common/http"
import { environment } from "environments/environment"
import { MessageComponent } from 'app/components/message/message.component';
import { check404 } from 'app/utils/common';

import { forkJoin } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-client-item',
  templateUrl: './client-item.component.html',
  styleUrls: ['./client-item.component.scss']
})
export class ClientItemComponent implements OnInit {

  @ViewChild('message') message: MessageComponent;
  @ViewChild('clientNumber') clientNumber: ElementRef;

  @Input() item: Client;
  @Input() isNew: boolean;

  ranges: ClientRange[];
  types: ClientType[];

  tag_client_number = 'client_number';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    forkJoin([
      this.http.get<ClientRange[]>(environment.urlApi + 'ClientRange').pipe(tap(res => this.ranges = res)),
      this.http.get<ClientType[]>(environment.urlApi + 'ClientType').pipe(tap(res => this.types = res))
    ]).subscribe(() => {
      if (this.isNew) {
        if (this.types.length > 0)
          this.item.clientTypeId = this.types[0].clientTypeId;

        if (this.ranges.length > 0)
          this.onUseRange(this.ranges[0].clientRangeId);
      }
    });
  }

  onUseRange(id: number) {
    this.http.get<number>(environment.urlApi + 'Client/newNumber/' + id)
      .subscribe({
        next: (result) => this.item.clientNumber = result,
        error: console.error
      });
  }

  async check(): Promise<boolean> {
    let ok = true;
    try {
      const client = await this.http.get<ClientCheck>(environment.urlApi + 'Client/byNumber/' + this.item.clientNumber).toPromise();
      ok = client.clientId == this.item.clientId;
      if (!ok)
        this.message.show(this.tag_client_number, 'CLIENT.ERROR.NUMBER', null, this.item.clientNumber.toString(), client.name);
    }
    catch (e) {
      check404(e);
    }
    return ok;
  }

  closeEvent(tag: string) {
    if (tag == this.tag_client_number) {
      setTimeout(() => {
        this.clientNumber.nativeElement.focus();
      }, 100)
    }
  }
}
