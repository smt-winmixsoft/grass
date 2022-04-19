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
  intercompany: boolean = false;
  notActive: boolean = false;
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

export class ContractState {
  static NEW: number = 0;
  static SEND: number = 1;
  static PRINT: number = 2;
  static SIGN: number = 3;
  static UNSIGN: number = 4;
}

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

export class ClientContractList extends Array<ClientContract> {
  resort() {
    this.sort((a: ClientContract, b: ClientContract) => {
      if (a.contractYear > b.contractYear)
        return -1;
      else if (a.contractYear < b.contractYear)
        return 1;
      else
        return 0;
    });
  };

  del(id: number) {
    let index = this.findIndex((x) => x.clientContractId === id);
    if (index > -1)
      this.splice(index, 1);
  };

  get(id: number): ClientContract {
    let index = this.findIndex((x) => x.clientContractId === id);
    if (index > -1)
      return this[index];
    else
      return null;
  }
}


