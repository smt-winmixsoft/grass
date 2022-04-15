import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { PackType, PartyOut, Party, Client, forSaveOut, CLIENT_I } from '../../party.model';
import { environment } from "environments/environment"
import { HttpClient } from "@angular/common/http"
import { ActivatedRoute } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { abort, AbortError } from 'app/utils/common';
import { Location } from '@angular/common'
import { MessageComponent } from '@components/message/message.component';

@Component({
  selector: 'app-ship-item',
  templateUrl: './ship-item.component.html',
  styleUrls: ['./ship-item.component.scss']
})
export class ShipItemComponent implements OnInit, AfterViewInit {

  @Input() isNew: boolean;
  @Input() isDel: boolean;

  @ViewChild('message') message: MessageComponent;
  @ViewChild('product') product: ElementRef;
  @ViewChild('price') price: ElementRef;

  @ViewChild('available') available: ElementRef;
  @ViewChildren("available") public availableList: QueryList<ElementRef>

  item: PartyOut;
  party: Party;
  packTypes: PackType[];

  productLeft: number = 0;
  productAvailable: number = 0;

  pageMain: boolean = true;
  pageClient: boolean = false;
  clientType: number = CLIENT_I;

  tag_product = 'product';
  tag_price = 'price';
  tag_product_max = 'product_max';

  //#region Init

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location) {
    this.item = new PartyOut();
  }

  ngAfterViewInit(): void {
    this.availableList.changes.subscribe(() => this.refreshAvailable());
  }

  ngOnInit(): void {

    if (this.isNew)
      this.pageClientShow();

    this.http.get<PackType[]>(environment.urlApi + 'PackType')
      .subscribe({
        next: res => this.packTypes = res,
        error: console.error
      });

    var partyId: number;
    this.route.params
      .pipe(
        tap(params => {
          partyId = parseInt(params['id']);
          if (!this.isNew) {
            this.http.get<PartyOut>(environment.urlApi + 'PartyOut/' + params['shipId']).subscribe({
              next: (res) => this.item = res,
              error: console.error
            })
          }
          else {
            this.item.partyId = partyId;
          }
        }),

        // Get party
        concatMap(() => this.http.get<Party>(environment.urlApi + 'Party/' + partyId)),
        tap({
          next: (result) => {
            this.party = result;
            if (this.isNew) {
              this.item.packTypeId = this.party.packTypeId;
              this.item.price = this.party.dryPrice;
            }
          },
          error: console.error
        }),

        // Get shipped
        concatMap(() => this.http.get<number>(environment.urlApi + 'PartyOut/product/' + partyId)),
        tap({
          next: (result) => {
            this.productLeft = this.party.dryProduct - result + this.item.product;
            if (this.isNew)
              this.item.product = this.productLeft;
            else
              this.refreshAvailable();
          },
          error: console.error
        }),
      )
      .subscribe();
  }

  //#endregion Init

  //#region Save

  submitAdd() {
    this.http.post<any>(environment.urlApi + 'PartyOut/', forSaveOut(this.item))
      .subscribe({
        next: () => this.location.back(),
        error: console.error
      });
  }

  submitEdit() {
    this.http.put<any>(environment.urlApi + 'PartyOut/' + this.item.partyOutId, forSaveOut(this.item))
      .subscribe({
        next: () => this.location.back(),
        error: console.error
      });
  }

  submitDel() {
    this.http.delete<any>(environment.urlApi + 'PartyOut/' + this.item.partyOutId)
      .subscribe({
        next: () => this.location.back(),
        error: console.error
      });
  }

  async submit() {
    try {
      let ok = this.check();
      if (!ok)
        abort();

      if (this.isDel) {
        this.submitDel();
      }
      else {
        if (this.isNew)
          this.submitAdd();
        else
          this.submitEdit();
      }
    }
    catch (e) {
      if (!(e instanceof AbortError))
        throw e;
    }
  }

  check(): boolean {
    let ok = true;

    if (ok) {
      ok = this.item.product !== null;
      if (!ok)
        this.message.show(this.tag_product, 'SHIP.ERROR.PRODUCT');
    }

    if (ok) {
      ok = this.item.price !== null;
      if (!ok)
        this.message.show(this.tag_price, 'SHIP.ERROR.PRICE');
    }

    if (ok) {
      ok = this.productAvailable >= 0;
      if (!ok)
        this.message.show(this.tag_price, 'SHIP.ERROR.PRODUCT.MAX');
    }

    return ok;
  }

  closeEvent(tag: string) {
    if (tag == this.tag_product || tag == this.tag_product_max) {
      setTimeout(() => {
        this.product.nativeElement.focus();
      }, 100)
    }

    if (tag == this.tag_price) {
      setTimeout(() => {
        this.price.nativeElement.focus();
      }, 100)
    }
  }

  //#endregion Save

  //#region Events

  setDate($event) {
    this.item.outDate = new Date($event);
  }

  backLink(): string {
    return (this.isNew) ? '..' : '../..';
  }

  setProduct($event) {
    this.item.product = parseInt($event);
    this.refreshAvailable();
  }

  refreshAvailable(): void {
    if (isNaN(this.item.product))
      this.productAvailable = this.productLeft;
    else
      this.productAvailable = this.productLeft - this.item.product;

    if (this.available) {
      this.available.nativeElement.classList.remove('is-invalid');
      this.available.nativeElement.classList.remove('is-valid');
      if (this.productAvailable < 0)
        this.available.nativeElement.classList.add('is-invalid');
      else
        this.available.nativeElement.classList.add('is-valid');
    }
  }

  //#endregion Events

  //#region Pages

  //#region Common Page

  pageHide() {
    this.pageMain = true;
  }

  pageShow() {
    this.pageMain = false;
  }

  //#endregion Common Page

  //#region Client Page

  pageClientHide() {
    this.pageClient = false;
    this.pageHide();

    this.available;

    this.refreshAvailable();
  }

  pageClientShow() {
    this.pageClient = true;
    this.pageShow();
  }

  pageClientResult(id: number) {
    this.pageClientHide();
    this.http.get<Client>(environment.urlApi + 'Client/' + id).subscribe({
      next: (result) => {
        this.item.client = result;
        this.item.clientId = result.clientId;
      },
      error: console.error
    });
  }

  //#endregion Client Page

  //#endregion Pages

}
