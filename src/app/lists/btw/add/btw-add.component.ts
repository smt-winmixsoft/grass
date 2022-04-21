import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from "environments/environment"
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { Btw } from '../btw.model';
import { TranslateService } from '@ngx-translate/core';
import { check404 } from 'app/utils/common';
import { MessageComponent } from '@components/message/message.component';

@Component({
  selector: 'app-btw-add',
  templateUrl: './btw-add.component.html',
  styleUrls: ['./btw-add.component.scss']
})
export class BtwAddComponent implements OnInit {

  @ViewChild('message') message: MessageComponent;
  @ViewChild('number') number: ElementRef;

  public item: Btw = new Btw();

  tag_number = 'number';

  constructor(private router: Router, private http: HttpClient, private translate: TranslateService) {
    translate.get('BTW.NEW').subscribe((res: string) => this.item.name = res);
  }

  ngOnInit(): void {
    this.chooseNumber();
  }

  onSubmit(): void {
    if (!this.check()) return;

    this.http.post<any>(environment.urlApi + 'Btw/', this.item)
      .subscribe({
        next: () => this.router.navigate(['/btw']),
        error: console.error
      });
  }

  chooseNumber() {
    this.http.get<number>(environment.urlApi + 'Btw/newNumber/').subscribe({
      next: (result) => this.item.btwNumber = result,
      error: console.error
    });
  }

  async check(): Promise<boolean> {
    let ok = true;
    try {

      ok = await this.http.get<boolean>(environment.urlApi + 'Btw/checkNumber/' + this.item.btwNumber).toPromise();
      if (!ok)
        this.message.show(this.tag_number, 'ERROR.NUMBER', null, this.item.btwNumber.toString());

    }
    catch (e) {
      check404(e);
    }
    return ok;
  }

  closeEvent(tag: string) {
    if (tag == this.tag_number) {
      setTimeout(() => {
        this.number.nativeElement.focus();
      }, 100)
    }
  }
}
