import { ObjectInit } from "@/utils/common";

export class Client implements ObjectInit {
  init(): void {
  }

  clientId: number = 0;
  name: string = "";
  clientTypeId: number = 0;
  clientType: ClientType = new ClientType();
  clientNumber: number = 0;
  address: string = "";
  postcode: string = "";
  postcodeId: string = "";
  residence: string = "";
  phone: string = "";
  eco: boolean = false;
  ubn: string = "";
  mestnummer: string = "";
  gmp: boolean = false;
  intercompany: boolean = false;
  notActive: boolean = false;
  hasContract: boolean = false;

  get contractNumber(): string {
    if (this.hasContract)
      return this.clientNumber.toString();
    else
      return '';
  }
}

export class ClientType {
  clientTypeId: number = 0;
  name: string = "";
}
