import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @ViewChild('content') content;
  @Output() closeEvent = new EventEmitter<string>();
  @Output() answerEvent = new EventEmitter<AskResult>();

  title = '';
  message = '';
  isAsk: boolean = false;
  isDelete: boolean = false;

  constructor(private modalService: NgbModal, private translate: TranslateService) { }

  ngOnInit(): void {
  }

  ask(ai: AskInfo) {

    if (ai.title == null)
      ai.title = 'HOME.TITLE';
    this.isAsk = true;
    this.isDelete = ai.isDelete;

    forkJoin([
      this.translate.get(ai.message).pipe(tap(res => {
        this.message = res;
        if (ai.p1 != null)
          this.message = this.message.replace('$1', ai.p1);
        if (ai.p2 != null)
          this.message = this.message.replace('$2', ai.p2);
        if (ai.p3 != null)
          this.message = this.message.replace('$3', ai.p2);
      })),
      this.translate.get(ai.title).pipe(tap(res => this.title = res))
    ]).subscribe(() => {
      this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then(res => {
        this.answerEvent.emit({
          tag: ai.tag,
          answer: res,
          data: ai.data
        });
      });
    });
  }

  show(tag: string, message: string, title: string = null, p1: string = null, p2: string = null, p3: string = null) {
    this.isAsk = false;

    if (title == null)
      title = 'HOME.TITLE';

    forkJoin([
      this.translate.get(message).pipe(tap(res => {
        this.message = res;
        if (p1 != null)
          this.message = this.message.replace('$1', p1);
        if (p2 != null)
          this.message = this.message.replace('$2', p2);
        if (p3 != null)
          this.message = this.message.replace('$3', p2);
      })),
      this.translate.get(title).pipe(tap(res => this.title = res))
    ]).subscribe(() => {
      this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then(res => {
        this.closeEvent.emit(tag);
      });
    });
  }
}

export class AskInfo {
  tag: number;
  data: any;
  message: string;
  title: string = null;
  p1: string = null;
  p2: string = null;
  p3: string = null;
  isDelete: boolean = false;
}

export class AskResult {
  tag: number;
  answer: number;
  data: any;
}
