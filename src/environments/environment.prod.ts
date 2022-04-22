import { LogLevel } from '@azure/msal-browser';

export const environment = {
  production: true,
  urlApi: "https://grass-api.azurewebsites.net/api/",
  language: "nl",
  logLevel: LogLevel.Verbose,
  clientId: 'a635ab21-6a0d-4c1e-a0c7-3a28d828b95d',
  authority: 'https://login.microsoftonline.com/d819b495-b2a3-4cb7-99e7-f5b00a8e874f'
};
