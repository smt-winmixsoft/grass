import { AfterViewInit, Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from './client.model';
import { HttpClient } from "@angular/common/http"
import { environment } from "environments/environment"


@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit, AfterViewInit, DoCheck {

  @Input() title: string;
  @Input() client: Client;
  @Input() isEdit: boolean;
  @Output() clickEdit = new EventEmitter();
  isCheck: boolean = true;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.isCheck && this.client) {
      this.isCheck = false;
      this.checkContract();
    }
  }

  edit() {
    this.clickEdit.emit();
  }

  checkContract() {
    this.http.get<boolean>(environment.urlApi + 'Client/contract/' + this.client.clientId)
      .subscribe({
        next: (result) => this.client.hasContract = result,
        error: console.error
      });
  }

}
