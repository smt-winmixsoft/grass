// Object.assign(this.item, result)

export class Client {
  clientId: number = 0;
  name: string = null;
  clientTypeId: number = 0;
  clientNumber: number = 0;
  address: string = null;
  postcode: string = null;
  postcodeId: string = null;
  residence: string = null;
  phone: string = null;
  eMail: string = null;
  eco: boolean = false;
  ubn: string = null;
  mestnummer: string = null;
  gmp: boolean = false;
  paper: boolean = false;
  intercompany: boolean = false;
  notActive: boolean = false;
  contractSigned: boolean = false;
}

export class ClientCheck {
  clientId: number;
  name: string;
}

export class ClientRange {
  clientRangeId: number;
  name: string;
  rangeFrom: number;
  rangeTo: number;
}

export class ClientType {
  clientTypeId: number;
  name: string;
}

export const CONTRACT_NEW: number = 0;
export const CONTRACT_SEND: number = 1;
export const CONTRACT_PRINT: number = 2;
export const CONTRACT_SIGN: number = 3;
export const CONTRACT_UNSIGN: number = 4;


export class ClientContract {
  clientContractId: number;
  clientId: number;
  contractYear: number;
  inDate: Date = new Date();
  sendDate: Date = null;
  signDate: Date = null;
  contractState: number = 0;
  sendState: number = 0;
}

export function forSave(item: ClientContract): ClientContract {
  return {
    clientContractId: item.clientContractId,
    clientId: item.clientId,
    contractYear: item.contractYear,
    inDate: item.inDate,
    sendDate: item.sendDate,
    signDate: item.signDate,
    contractState: item.contractState,
    sendState: item.sendState
  } as ClientContract;
}

function compareYear(a: ClientContract, b: ClientContract) {
  if (a.contractYear > b.contractYear)
    return -1;
  else if (a.contractYear < b.contractYear)
    return 1;
  else
    return 0;
}

export function sortContact(items: ClientContract[]) {
  items.sort(compareYear);
}

export function delContact(items: ClientContract[], id: number) {
  let index = items.findIndex((x) => x.clientContractId === id);
  if (index > -1)
    items.splice(index, 1);
}

export function getContact(items: ClientContract[], id: number): ClientContract {
  let index = items.findIndex((x) => x.clientContractId === id);
  if (index > -1)
    return items[index];
  else
    return null;
}
