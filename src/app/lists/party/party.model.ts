import { Client } from '@components/client-info/client.model';
import { ObjectInit, doAssign } from 'app/utils/common';

export class Party implements ObjectInit {
  partyId: number = 0;
  clientId: number = null;
  inDate: Date = new Date();
  partyType: number = 0;
  partyYear: number = (new Date()).getFullYear();
  partyNumber: number = 0;
  area: number = null;
  freshProduct: number = null;
  dryProduct: number = null;
  humidity: number = null;
  dryPrice: number = null;
  materialId: number = 0;
  packTypeId: number = 0;
  organicId: number = 0;
  discountSupply: number = null;
  discountDisposal: number = null;
  sampleNumber1: number = null;
  sampleNumber2: number = null;
  probeId: number = 0;
  client: Client = new Client();
  packType: PackType = new PackType();
  probe: Probe = new Probe();
  partyOut: PartyOutList;

  init() {
    this.client = doAssign(Client, this.client);
  }

  get surcharge(): number {
    return null;
  }

  get priceSample(): number {
    return this.probe?.price;
  }

  get isSample(): boolean {
    return this.sampleNumber1 != null || this.sampleNumber2 != null
  }

  get price(): number {
    return this.dryPrice - this.discountSupply - this.discountDisposal + this.surcharge;
  }

  get total(): number {
    return this.price * this.dryProduct / 100;
  }

  get finalTotal(): number {
    return this.total + this.priceSample;
  }

  get available(): number {
    return this.dryProduct - this.partyOut?.product;
  }
}

export const PARTY_DRYING: number = 0;
export const PARTY_TRADE: number = 1;
export const PARTY_NONE: number = -1;

export const CLIENT_LD: number = 0;
export const CLIENT_H: number = 1;
export const CLIENT_I: number = 2;

export function urlToPartyType(url: string): number {
  const index = url.indexOf('/', 1);
  if (index != -1)
    url = url.substring(0, index);

  switch (url) {
    case "/drying":
      return PARTY_DRYING;
    case "/trade":
      return PARTY_TRADE;
    default:
      return PARTY_NONE;
  }
}

export function forSave(item: Party): Party {
  return {
    partyId: item.partyId,
    clientId: item.clientId,
    partyNumber: item.partyNumber,
    partyType: item.partyType,
    partyYear: item.partyYear,
    inDate: item.inDate,
    area: item.area,
    freshProduct: item.freshProduct,
    dryProduct: item.dryProduct,
    humidity: item.humidity,
    dryPrice: item.dryPrice,
    materialId: item.materialId,
    packTypeId: item.packTypeId,
    organicId: item.organicId,
    discountSupply: item.discountSupply,
    discountDisposal: item.discountDisposal,
    sampleNumber1: item.sampleNumber1,
    sampleNumber2: item.sampleNumber2,
    probeId: item.probeId
  } as Party;
}

export class Material {
  materialId: number = 0;
  name: string = "";
}

export class PackType {
  packTypeId: number = 0;
  name: string = "";
}

export class Organic {
  organicId: number = 0;
  name: string = "";
}

export class Probe {
  probeId: number = 0;
  name: string = "";
  price: number = 0;
}

export class PartyOut implements ObjectInit {
  init(): void {
  }
  partyOutId: number = 0;
  partyId: number = null;
  clientId: number = null;
  packTypeId: number = null;
  outDate: Date = new Date();
  product: number = null;
  price: number = null;
  client: Client = new Client();
  packType: PackType = new PackType();
  get total(): number {
    return (this.price * this.product) / 100;
  }
}

export class PartyOutList extends Array<PartyOut> implements ObjectInit {
  party: Party = null;
  message: string = null;

  init(): void {
    this.forEach((item, index, array) => array[index] = doAssign(PartyOut, item));
  }

  get total(): number {
    let res: number = 0;
    this.forEach(x => res += x.total);
    return res;
  }

  get product(): number {
    let res: number = 0;
    this.forEach(x => res += x.product);
    return res;
  }

  get available(): number {
    return this.party?.dryProduct - this.product;
  }

  get isSold(): boolean {
    return this.product >= this.party?.dryProduct;
  }

  get totalDiff(): number {
    return this.total - this.party?.finalTotal;
  }

  get infoMessage(): string {
    return this.message
      .replace('$1', (this.available).toString());
  }
}

export function forSaveOut(item: PartyOut): PartyOut {
  return {
    partyOutId: item.partyOutId,
    partyId: item.partyId,
    clientId: item.clientId,
    packTypeId: item.packTypeId,
    outDate: item.outDate,
    product: item.product,
    price: item.price,
  } as PartyOut;
}

function comparePartyOutDate(a: PartyOut, b: PartyOut) {
  if (a.outDate < b.outDate)
    return -1;
  else if (a.outDate > b.outDate)
    return 1;
  else
    return 0;
}

export function sortPartyOut(item: PartyOutList) {
  item.sort(comparePartyOutDate);
}
