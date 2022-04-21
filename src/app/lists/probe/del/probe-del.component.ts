import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "environments/environment"
import { HttpClient } from "@angular/common/http"
import { Probe } from '../probe.model';

@Component({
  selector: 'app-probe-del',
  templateUrl: './probe-del.component.html',
  styleUrls: ['./probe-del.component.scss']
})
export class ProbeDelComponent implements OnInit {
  public item: Probe;

  constructor(route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.item = new Probe()
    route.params.subscribe(params => { this.item.probeId = params['id']; });
  }

  ngOnInit(): void {
    this.http.get<any>(environment.urlApi + 'Probe/' + this.item.probeId)
      .subscribe({
        next: (result) => this.item = result,
        error: console.error
      });
  }

  onSubmit(): void {
    this.http.delete<any>(environment.urlApi + 'Probe/' + this.item.probeId)
      .subscribe({
        next: () => this.router.navigate(['/probe']),
        error: console.error
      });
  }
}
