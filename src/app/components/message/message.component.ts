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

  title = '';
  message = '';

  constructor(private modalService: NgbModal, private translate: TranslateService) { }

  ngOnInit(): void {
  }

  show(tag: string, message: string, title: string = null, p1: string = null, p2: string = null, p3: string = null) {
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
