import { LogLevel } from '@azure/msal-browser';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    urlApi: "https://localhost:7088/api/",
    language: "nl",
    logLevel: LogLevel.Error,
    clientId: '1650178b-9a13-4430-9c99-2d0039830af2',
    authority: 'https://login.microsoftonline.com/deac2086-0a77-4368-839c-0fbf9c22d009'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
