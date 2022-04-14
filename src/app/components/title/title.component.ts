import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() buttonCaption: string = null;
  @Input() routerLink: string = null;
  @Output() buttonClick = new EventEmitter<string>();
  isButtons: boolean = true;

  show = true;

  constructor() { }

  ngOnInit(): void {
  }

  doClick() {
    this.buttonClick.emit();
  }

  hideButtons() {
    this.isButtons = false;
  }

  showButtons() {
    this.isButtons = true;
  }
}
