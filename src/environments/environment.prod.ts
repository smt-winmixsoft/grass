import { LogLevel } from '@azure/msal-browser';

export const environment = {
    production: true,
    urlApi: "https://grassapi.azurewebsites.net/api/",
    language: "en",
    logLevel: LogLevel.Verbose,
    clientId: '489801fa-58f4-4756-83ee-3d0efce4c4f6',
    authority: 'https://login.microsoftonline.com/deac2086-0a77-4368-839c-0fbf9c22d009'
};
