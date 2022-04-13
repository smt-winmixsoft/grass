import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from "@angular/platform-browser";
import { environment } from "environments/environment"
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AppService } from '@services/app.service';

//#region MSAL
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
//#endregion MSAL

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  //#region MSAL
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  //#endregion MSAL

  constructor(
    //#region MSAL
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    //#endregion MSAL
    translate: TranslateService,
    titleService: Title
  ) {
    translate.addLangs(['en', 'nl']);
    translate.setDefaultLang('en');

    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|nl/) ? browserLang : 'en');

    translate.use(environment.language);
    translate.get('HOME.TITLE').subscribe((res: string) => titleService.setTitle(res));
  }

  ngOnInit(): void {

    //#region MSAL

    this.isIframe = window !== window.parent && !window.opener;

    /**
     * You can subscribe to MSAL events as shown below. For more info,
     * visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/events.md
     */
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });

    //#endregion MSAL
  }

  //#region MSAL

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }
  }

  logout() {
    this.authService.logout();
  }

  //#endregion MSAL

  ngOnDestroy(): void {
    //#region MSAL

    // unsubscribe to events when component is destroyed
    this._destroying$.next(undefined);
    this._destroying$.complete();

    //#endregion MSAL
  }
}
