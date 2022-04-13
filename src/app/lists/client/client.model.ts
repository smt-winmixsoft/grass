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
