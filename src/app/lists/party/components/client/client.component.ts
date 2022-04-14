import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  @Input() title: string;
  @Input() buttonCaption: string;
  @Input() clientType: number;
  @Output() editorClose = new EventEmitter();
  @Output() editorResult = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.editorClose.emit();
  }

  result($event) {
    this.editorResult.emit($event);
  }
}
