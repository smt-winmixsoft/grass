import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { Probe } from '../probe.model';

@Component({
  selector: 'app-probe-edit',
  templateUrl: './probe-edit.component.html',
  styleUrls: ['./probe-edit.component.scss']
})
export class ProbeEditComponent implements OnInit {

  public item: Probe = new Probe();

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
    this.http.put<any>(environment.urlApi + 'Probe/' + this.item.probeId, this.item)
      .subscribe({
        next: () => this.router.navigate(['/probe']),
        error: console.error
      });
  }
}
