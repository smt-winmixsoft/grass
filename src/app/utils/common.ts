import { HttpErrorResponse } from "@angular/common/http"

export class DataTablesResponse {
  data: any[] = [];
  draw: number = 0;
  recordsFiltered: number = 0;
  recordsTotal: number = 0;
}

export function formatNumberValue(val: number, fractionDigits: number = 3): string {
  if (val == null)
    return '';
  else
    return val.toFixed(fractionDigits);
}

export function formatStringValue(val: string): number {
  var res = parseFloat(val);
  if (isNaN(res))
    res = null
  return res;
}

export function formatNumber(val: any[], field: string = "value", fractionDigits: number = 3) {
  val.forEach(el => el[field] = formatNumberValue(el[field], fractionDigits));
}

export function formatString(val: any[], field: string = "value") {
  val.forEach(el => el[field] = formatStringValue(el[field]));
}


export class AbortError {
}

export function abort() {
  throw new AbortError();
}

export function check404(e: any) {
  if (e instanceof HttpErrorResponse)
  {
    if (e.status != 404)
      throw e;
  }
  else throw e;
}
