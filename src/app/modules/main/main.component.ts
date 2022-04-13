import { AppState } from '@/store/state';
import { ToggleSidebarMenu } from '@/store/ui/actions';
import { UiState } from '@/store/ui/state';
import { Component, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

//#region MSAL
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, AuthenticationResult, InteractionStatus } from '@azure/msal-browser';
import { GraphService, ProviderOptions } from '../../graph.service';
import { protectedResources } from '../../auth-config';
import { InteractionType } from "@azure/msal-browser";
//#endregion MSAL

import { AppService } from '@services/app.service';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'wrapper';
  public ui: Observable<UiState>;

  //#region MSAL
  loginDisplay = false;
  displayedColumns: string[] = ['claim', 'value'];
  dataSource: any = [];

  private readonly _destroying$ = new Subject<void>();
  //#endregion MSAL

  constructor(
    //#region MSAL
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private graphService: GraphService,
    //#endregion MSAL

    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private appService: AppService,
    private renderer: Renderer2,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.ui = this.store.select('ui');
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'login-page'
    );
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'register-page'
    );
    this.renderer.addClass(
      document.querySelector('app-root'),
      'layout-fixed'
    );

    this.ui.subscribe(
      ({ menuSidebarCollapsed, controlSidebarCollapsed, darkMode }) => {
        if (menuSidebarCollapsed) {
          this.renderer.removeClass(
            document.querySelector('app-root'),
            'sidebar-open'
          );
          this.renderer.addClass(
            document.querySelector('app-root'),
            'sidebar-collapse'
          );
        } else {
          this.renderer.removeClass(
            document.querySelector('app-root'),
            'sidebar-collapse'
          );
          this.renderer.addClass(
            document.querySelector('app-root'),
            'sidebar-open'
          );
        }

        if (controlSidebarCollapsed) {
          this.renderer.removeClass(
            document.querySelector('app-root'),
            'control-sidebar-slide-open'
          );
        } else {
          this.renderer.addClass(
            document.querySelector('app-root'),
            'control-sidebar-slide-open'
          );
        }

        if (darkMode) {
          this.renderer.addClass(
            document.querySelector('app-root'),
            'dark-mode'
          );
        } else {
          this.renderer.removeClass(
            document.querySelector('app-root'),
            'dark-mode'
          );
        }
      }
    );

    //#region MSAL

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
        this.getClaims(this.authService.instance.getActiveAccount()?.idTokenClaims)
      });

    //#endregion MSAL

  }

  onToggleMenuSidebar() {
    this.store.dispatch(new ToggleSidebarMenu());
  }

  //#region MSAL

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }

    activeAccount = this.authService.instance.getActiveAccount();
    this.appService.user = {
      email: activeAccount.username,
      picture: null
    }

    this.getLogo();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  getClaims(claims: any) {
    this.dataSource = [
      { id: 1, claim: "Display Name", value: claims ? claims['name'] : null },
      { id: 2, claim: "User Principal Name (UPN)", value: claims ? claims['preferred_username'] : null },
      { id: 2, claim: "OID", value: claims ? claims['oid'] : null }
    ];
  }

  getLogo() {
    const providerOptions: ProviderOptions = {
      account: this.authService.instance.getActiveAccount()!,
      scopes: protectedResources.graphMe.scopes,
      interactionType: InteractionType.Popup
    };

    this.graphService.getGraphClient(providerOptions)
      //.api('/me/photo/$value').get()
      .api('/me/photos/48x48/$value').get()
      .then(async (data) => {
        let objectURL = URL.createObjectURL(data);
        this.appService.user.picture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //#endregion MSAL

  ngOnDestroy(): void {
    //#region MSAL
    this._destroying$.next(undefined);
    this._destroying$.complete();
    //#endregion MSAL
  }
}
