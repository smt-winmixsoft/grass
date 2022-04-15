import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Party, Client, Material, PackType, Organic, Probe, urlToPartyType, PARTY_DRYING, PARTY_TRADE, CLIENT_LD, CLIENT_H } from '../../party.model';

import { HttpClient } from "@angular/common/http"
import { Router } from '@angular/router';
import { environment } from "environments/environment"
import { MessageComponent } from '@components/message/message.component';
import { check404 } from 'app/utils/common';

import { forkJoin } from "rxjs";
import { tap } from "rxjs/operators";
import { TitleComponent } from '@components/title/title.component';

@Component({
  selector: 'app-party-item',
  templateUrl: './party-item.component.html',
  styleUrls: ['./party-item.component.scss']
})
export class PartyItemComponent implements OnInit  {

  @ViewChild('message') message: MessageComponent;
  @ViewChild('partyNumber') partyNumber: ElementRef;
  @ViewChild('sample1') sample1: ElementRef;
  @ViewChild('sample2') sample2: ElementRef;

  @Input() item: Party;
  @Input() isNew: boolean;
  @Input() title: TitleComponent;

  materials: Material[] = [];
  packTypes: PackType[] = [];
  organics: Organic[] = [];
  probes: Probe[] = [];

  isMain: boolean = true;
  isClientEditor: boolean = false;
  isShippedEditor: boolean = false;

  clientType: number = 0;

  partyType: number = 0;
  isDrying: boolean;
  isTrade: boolean;

  tag_party_number = 'party_number';
  tag_sample1_number = 'sample1_number';
  tag_sample2_number = 'sample2_number';
  tag_client = 'client';

  constructor(private http: HttpClient, router: Router) {
    this.partyType = urlToPartyType(router.url);
    this.isDrying = this.partyType == PARTY_DRYING;
    this.isTrade = this.partyType == PARTY_TRADE;
  }

  ngOnInit(): void {

    if (this.isNew) {
      this.clientOpen();
      this.chooseNumber();
      this.chooseSample2();
      this.item.partyType = this.partyType;
    }

    switch (this.item.partyType) {
      case PARTY_DRYING:
        this.clientType = CLIENT_LD;
        break;
      case PARTY_TRADE:
        this.clientType = CLIENT_H;
        break;
    }

    forkJoin([
      this.http.get<Material[]>(environment.urlApi + 'Material').pipe(tap(res => this.materials = res)),
      this.http.get<PackType[]>(environment.urlApi + 'PackType').pipe(tap(res => this.packTypes = res)),
      this.http.get<Organic[]>(environment.urlApi + 'Organic').pipe(tap(res => this.organics = res)),
      this.http.get<Probe[]>(environment.urlApi + 'Probe').pipe(tap(res => this.probes = res))
    ]).subscribe(() => {
      if (this.isNew) {
        if (this.materials.length > 0)
          this.item.materialId = this.materials[0].materialId;
        if (this.packTypes.length > 0)
          this.item.packTypeId = this.packTypes[0].packTypeId;
        if (this.organics.length > 0)
          this.item.organicId = this.organics[0].organicId;
        if (this.probes.length > 0)
          this.item.probeId = this.probes[0].probeId;
      }
    });
  }

  async check(): Promise<boolean> {
    let ok = true;
    try {
      if (this.isNew) {
        ok = this.item.clientId !== null;
        if (!ok)
          this.message.show(this.tag_client, 'PARTY.ERROR.CLIENT');

        if (ok) {
          ok = await this.http.get<boolean>(environment.urlApi + 'Party/checkNumber/' + this.item.partyNumber + '/' + this.item.partyYear).toPromise();
          if (!ok)
            this.message.show(this.tag_party_number, 'PARTY.ERROR.NUMBER', null, this.item.partyNumber.toString());
        }

        if (ok && this.item.sampleNumber1 !== null) {
          ok = await this.http.get<boolean>(environment.urlApi + 'Sample/checkNumber/' + this.item.sampleNumber1 + '/' + this.item.partyYear).toPromise();
          if (!ok)
            this.message.show(this.tag_sample1_number, 'PARTY.ERROR.SAMPLE1', null, this.item.sampleNumber1.toString());
        }

        if (ok && this.item.sampleNumber2 !== null) {
          ok = await this.http.get<boolean>(environment.urlApi + 'Sample/checkNumber/' + this.item.sampleNumber2 + '/' + this.item.partyYear).toPromise();
          if (!ok)
            this.message.show(this.tag_sample2_number, 'PARTY.ERROR.SAMPLE2', null, this.item.sampleNumber2.toString());
        }
      }
    }
    catch (e) {
      check404(e);
    }
    return ok;
  }

  closeEvent(tag: string) {
    if (tag == this.tag_party_number) {
      setTimeout(() => {
        this.partyNumber.nativeElement.focus();
      }, 100)
    }

    if (tag == this.tag_sample1_number) {
      setTimeout(() => {
        this.sample1.nativeElement.focus();
      }, 100)
    }

    if (tag == this.tag_sample2_number) {
      setTimeout(() => {
        this.sample2.nativeElement.focus();
      }, 100)
    }

    if (tag == this.tag_client) {
      this.clientOpen();
    }
  }

  clientSave(id: number) {
    this.clientCancel();
    this.http.get<Client>(environment.urlApi + 'Client/' + id).subscribe({
      next: (result) => {
        this.item.client = result;
        this.item.clientId = result.clientId;
      },
      error: console.error
    });
  }


  editorCancel() {
    this.isMain = true;
    this.title.showButtons();
  }

  editorOpen() {
    this.isMain = false;
    this.title.hideButtons();
  }

  clientCancel() {
    this.isClientEditor = false;
    this.editorCancel();
  }

  clientOpen() {
    this.isClientEditor = true;
    this.editorOpen();
  }

  shippedCancel() {
    this.isShippedEditor = false;
    this.editorCancel();
  }

  shippedOpen() {
    this.isShippedEditor = true;
    this.editorOpen();
  }

  chooseNumber() {
    this.http.get<number>(environment.urlApi + 'Party/newNumber/' + this.item.partyYear).subscribe({
      next: (result) => this.item.partyNumber = result,
      error: console.error
    });
  }

  chooseSample1() {
    this.http.get<number>(environment.urlApi + 'Sample/newNumber/' + this.item.partyYear).subscribe({
      next: (result) => this.item.sampleNumber1 = result,
      error: console.error
    });
  }

  chooseSample2() {
    if (this.item.sampleNumber1 != null)
      this.item.sampleNumber2 = this.item.sampleNumber1 + 1;
    else {
      this.http.get<number>(environment.urlApi + 'Sample/newNumber/' + this.item.partyYear).subscribe({
        next: (result) => {
          this.item.sampleNumber1 = result;
          this.item.sampleNumber2 = result + 1;
        },
        error: console.error
      });
    }
  }

  setDate($event) {
    this.item.inDate = new Date($event);
    const year = this.item.partyYear;
    this.item.partyYear = this.item.inDate.getFullYear();
    if (year !== this.item.partyYear) {
      this.chooseNumber();
      if (this.item.sampleNumber1 !== null)
        this.chooseSample1();
      if (this.item.sampleNumber2 !== null)
        this.chooseSample2();
    }
  }

  setDryProduct($event) {
    this.item.dryProduct = parseInt($event);
    this.refreshHumidity();
  }

  setFreshProduct($event) {
    this.item.freshProduct = parseInt($event);
    this.refreshHumidity();
  }

  refreshHumidity() {
    if (this.item.freshProduct > 0) {
      this.item.humidity = (1 - this.item.dryProduct / this.item.freshProduct) * 100;
      this.item.humidity = parseFloat(this.item.humidity.toFixed(1));
      this.refreshPrice();
    }
  }

  refreshPrice() {
    if (this.isTrade) return;
    this.http.get<number>(environment.urlApi + 'Price/get/' + this.item.dryProduct + '/' + this.item.humidity + '/' + this.item.packTypeId).subscribe({
      next: (result) => {
        this.item.dryPrice = result;
        this.item.dryPrice = parseFloat(this.item.dryPrice.toFixed(2));
      },
      error: console.error
    });
  }
}
