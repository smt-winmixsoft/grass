import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() buttonCaption: string = null;
  @Input() routerLink: string = null;

  show = true;

  constructor() { }

  ngOnInit(): void {
  }

}
