import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from "environments/environment"
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { AnalysisType } from '../analysis-type.model';
import { TranslateService } from '@ngx-translate/core';
import { MessageComponent } from '@components/message/message.component';
import { check404 } from '@/utils/common';

@Component({
  selector: 'app-analysis-type-add',
  templateUrl: './analysis-type-add.component.html',
  styleUrls: ['./analysis-type-add.component.scss']
})
export class AnalysisTypeAddComponent implements OnInit {

  @ViewChild('message') message: MessageComponent;
  @ViewChild('number') number: ElementRef;

  public item: AnalysisType = new AnalysisType();

  tag_number = 'number';

  constructor(private router: Router, private http: HttpClient, private translate: TranslateService) {
    translate.get('ANALYSIS_TYPE.NEW').subscribe((res: string) => this.item.name = res);
  }

  ngOnInit(): void {
    this.chooseNumber();
  }

  onSubmit(): void {
    if (!this.check()) return;

    this.http.post<any>(environment.urlApi + 'AnalysisType/', this.item)
      .subscribe({
        next: () => this.router.navigate(['/analysis-type']),
        error: console.error
      });
  }

  chooseNumber() {
    this.http.get<number>(environment.urlApi + 'AnalysisType/newNumber/').subscribe({
      next: (result) => this.item.analysisTypeNumber = result,
      error: console.error
    });
  }

  async check(): Promise<boolean> {
    let ok = true;
    try {

      ok = await this.http.get<boolean>(environment.urlApi + 'AnalysisType/checkNumber/' + this.item.analysisTypeNumber).toPromise();
      if (!ok)
        this.message.show(this.tag_number, 'ERROR.NUMBER', null, this.item.analysisTypeNumber.toString());

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
