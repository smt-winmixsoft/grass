import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-minas-param',
  templateUrl: './minas-param.component.html',
  styleUrls: ['./minas-param.component.scss']
})
export class MinasParamComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  @Output() closeEvent = new EventEmitter<MinasParams>();

  param: MinasParams;
  years: number[];
  quarters: number[];

  constructor(private modalService: NgbModal) {
    this.param = new MinasParams();

    this.years = [];
    for (let i = this.param.year + 10; i >= this.param.year - 10; i--)
      this.years.push(i);

    this.quarters = [];
    for (let i = 1; i <= 4; i++)
      this.quarters.push(i);
  }

  ngOnInit(): void {
  }

  show(clientId: number) {
    this.param.clientId = clientId;
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then(res => {
      this.param.result = res;
      this.param.refreshDates();
      this.closeEvent.emit(this.param);
    });
  }
}

export class MinasParams {
  constructor() {
    let now = new Date();
    this.year = now.getFullYear();
    this.quarter = Math.floor(now.getMonth()/3) + 1;
  }
  result: any;
  clientId: number;
  year: number;
  quarter: number;
  dateBegin: Date;
  dateEnd: Date;
  refreshDates()
  {
    let month = (this.quarter - 1) * 3;
    this.dateBegin = new Date(this.year, month, 1);
    this.dateEnd = new Date(this.year, month + 3, 0);
  }
}
