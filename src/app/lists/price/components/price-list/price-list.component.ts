import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Price, PriceWeight } from '../../price.model';
import { MessageComponent } from 'app/components/message/message.component';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

  @ViewChild('message') message: MessageComponent;
  @ViewChild('humidity') humidity: ElementRef;
  @ViewChild('weight') weight: ElementRef;

  @Input() item: Price;
  public priceWeight: PriceWeight = new PriceWeight();

  tag_humidity_100 = 'humidity_100';
  tag_humidity_required = 'humidity_required';
  tag_weight_required = 'weight_required';

  constructor() {
  }

  ngOnInit(): void {
  }

  addWeight(): void {
    if (this.priceWeight.humidity >= 100)
      this.message.show(this.tag_humidity_100, 'PRICE.ERROR.HUMIDITY.100');
    else if (this.priceWeight.humidity === null)
      this.message.show(this.tag_humidity_required, 'PRICE.ERROR.HUMIDITY.REQUIRED');
    else if (this.priceWeight.weight === null)
      this.message.show(this.tag_weight_required, 'PRICE.ERROR.WEIGHT.REQUIRED');
    else
      this.item.addPriceWeight(this.priceWeight);
  }

  delWeight(priceWeight: PriceWeight): void {
    this.item.removePriceWeight(priceWeight);
  }

  closeEvent(tag: string) {
    if (tag == this.tag_humidity_100 || tag == this.tag_humidity_required)
      this.humidity.nativeElement.focus()
    else if (tag == this.tag_weight_required)
      this.weight.nativeElement.focus();
  }
}
