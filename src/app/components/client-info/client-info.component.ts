import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from './client.model';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {

  @Input() title: string;
  @Input() client: Client;
  @Input() isEdit: boolean;
  @Output() clickEdit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  edit() {
    this.clickEdit.emit();
  }

}
