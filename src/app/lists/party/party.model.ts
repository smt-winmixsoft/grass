export class Party {
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

export function getRootUrl(partyType: number): string {
  switch (partyType) {
    case PARTY_DRYING:
      return "/drying";
    case PARTY_TRADE:
      return "/trade";
    default:
      return "/";
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

export class Client {
  clientId: number = 0;
  name: string = "";
  clientTypeId: number = 0;
  clientType: ClientType = new ClientType();
  clientNumber: number = 0;
  address: string = "";
  postcode: string = "";
  residence: string = "";
  phone: string = "";
  eco: boolean = false;
  ubn: string = "";
  mestnummer: string = "";
  gmp: boolean = false;
  paper: boolean = false;
  intercompany: boolean = false;
  notActive: boolean = false;
  contractSigned: boolean = false;
}

export class ClientType {
  clientTypeId: number = 0;
  name: string = "";
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
}
