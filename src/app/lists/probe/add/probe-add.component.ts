import { Component, OnInit } from '@angular/core';
import { environment } from "environments/environment"
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { Probe } from '../probe.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-probe-add',
  templateUrl: './probe-add.component.html',
  styleUrls: ['./probe-add.component.scss']
})
export class ProbeAddComponent implements OnInit {

  public item: Probe = new Probe();

  constructor(private router: Router, private http: HttpClient, private translate: TranslateService) {
    translate.get('PROBE.NEW').subscribe((res: string) => this.item.name = res);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.http.post<any>(environment.urlApi + 'Probe/', this.item)
      .subscribe({
        next: () => this.router.navigate(['/probe']),
        error: console.error
      });
  }
}
