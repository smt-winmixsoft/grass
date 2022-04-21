import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from "environments/environment"
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { PackType } from '../pack-type.model';
import { TranslateService } from '@ngx-translate/core';
import { MessageComponent } from '@components/message/message.component';
import { check404 } from '@/utils/common';

@Component({
  selector: 'app-pack-type-add',
  templateUrl: './pack-type-add.component.html',
  styleUrls: ['./pack-type-add.component.scss']
})
export class PackTypeAddComponent implements OnInit {

  @ViewChild('message') message: MessageComponent;
  @ViewChild('number') number: ElementRef;

  public item: PackType = new PackType();

  tag_number = 'number';

  constructor(private router: Router, private http: HttpClient, private translate: TranslateService) {
    translate.get('PACK_TYPE.NEW').subscribe((res: string) => this.item.name = res);
  }

  ngOnInit(): void {
    this.chooseNumber();
  }

  onSubmit(): void {

    if (!this.check()) return;

    this.http.post<any>(environment.urlApi + 'PackType/', this.item)
      .subscribe({
        next: () => this.router.navigate(['/pack-type']),
        error: console.error
      });
  }

  chooseNumber() {
    this.http.get<number>(environment.urlApi + 'PackType/newNumber/').subscribe({
      next: (result) => this.item.packTypeNumber = result,
      error: console.error
    });
  }

  async check(): Promise<boolean> {
    let ok = true;
    try {

      ok = await this.http.get<boolean>(environment.urlApi + 'PackType/checkNumber/' + this.item.packTypeNumber).toPromise();
      if (!ok)
        this.message.show(this.tag_number, 'ERROR.NUMBER', null, this.item.packTypeNumber.toString());

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
