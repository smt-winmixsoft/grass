import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Output() resized = new EventEmitter<ResizedEvent>()

  constructor() { }

  ngOnInit(): void {
  }

  onResized(event: ResizedEvent) {
    this.resized.emit(event);
  }
}
