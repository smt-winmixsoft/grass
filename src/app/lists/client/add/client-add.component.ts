import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from "environments/environment"
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { Client } from '../client.model';
import { TranslateService } from '@ngx-translate/core';
import { abort, AbortError } from 'app/utils/common';
import { ClientItemComponent } from '../item/client-item.component';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  @ViewChild('client') client: ClientItemComponent;

  public item: Client = new Client();

  constructor(private router: Router, private http: HttpClient, private translate: TranslateService) {
    translate.get('PACK_TYPE.NEW').subscribe((res: string) => this.item.name = res);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.http.post<any>(environment.urlApi + 'Client/', this.item)
      .subscribe({
        next: () => this.router.navigate(['/client']),
        error: console.error
      });
  }

  async onSubmit() {
    try {
      let ok = await this.client.check();
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
