import { LogLevel } from '@azure/msal-browser';

export const environment = {
  production: true,
  urlApi: "https://grass-api-dev.azurewebsites.net/api/",
  language: "nl",
  logLevel: LogLevel.Verbose,
  clientId: '9eb79d90-9c88-4276-9784-3133d1f3d897',
  authority: 'https://login.microsoftonline.com/ad5b7d73-ee39-49d4-b08d-600df70a7304'
};