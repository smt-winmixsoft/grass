import { LogLevel } from '@azure/msal-browser';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    urlApi: "https://localhost:7088/api/",
    language: "nl",
    logLevel: LogLevel.Error,
    clientId: 'c4d917d5-8398-4cf5-ada7-0e56bdfbf836',
    authority: 'https://login.microsoftonline.com/ad5b7d73-ee39-49d4-b08d-600df70a7304'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
