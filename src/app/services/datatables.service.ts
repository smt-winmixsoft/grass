import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DataTablesService {

  nl: DataTables.LanguageSettings = null;
  en: DataTables.LanguageSettings = null;

  constructor(private translate: TranslateService) {
  }

  getSettings(): DataTables.LanguageSettings {
    switch (this.translate.currentLang) {
      case 'nl':
        if (this.nl === null) {
          this.nl = <DataTables.LanguageSettings>{
            url: '/assets/i18n/data-tables/nl.json'
          }
        }
        return this.nl;
      default:
        if (this.en === null) {
          this.en = <DataTables.LanguageSettings>{
            url: '/assets/i18n/data-tables/en.json'
          }
        }
        return this.en;
    }
  }
}
