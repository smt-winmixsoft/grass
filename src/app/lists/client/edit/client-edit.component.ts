import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { Client } from '../client.model';
import { abort, AbortError } from 'app/utils/common';
import { ClientItemComponent } from '../item/client-item.component';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  @ViewChild('client') client: ClientItemComponent;

  public item: Client = new Client();

  constructor(route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.item = new Client()
    route.params.subscribe(params => { this.item.clientId = params['id']; });
  }

  ngOnInit(): void {
    this.http.get<any>(environment.urlApi + 'Client/' + this.item.clientId)
      .subscribe({
        next: (result) => this.item = result,
        error: console.error
      });
  }

  save() {
    this.http.put<any>(environment.urlApi + 'Client/' + this.item.clientId, this.item)
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
