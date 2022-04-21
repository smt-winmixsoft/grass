import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '@modules/main/main.component';
import { BlankComponent } from '@pages/blank/blank.component';
import { LoginComponent } from '@modules/login/login.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { RegisterComponent } from '@modules/register/register.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { AuthGuard } from '@guards/auth.guard';
import { NonAuthGuard } from '@guards/non-auth.guard';
import { ForgotPasswordComponent } from '@modules/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from '@modules/recover-password/recover-password.component';
import { PrivacyPolicyComponent } from '@modules/privacy-policy/privacy-policy.component';
import { MainMenuComponent } from '@pages/main-menu/main-menu.component';
import { SubMenuComponent } from '@pages/main-menu/sub-menu/sub-menu.component';
import { MsalGuard } from '@azure/msal-angular';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [MsalGuard/*AuthGuard*/],
    canActivateChild: [MsalGuard/*AuthGuard*/],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'blank',
        component: BlankComponent
      },
      {
        path: 'sub-menu-1',
        component: SubMenuComponent
      },
      {
        path: 'sub-menu-2',
        component: BlankComponent
      },
      {
        path: 'pack-type',
        loadChildren: () => import('./lists/pack-type/pack-type.module').then(m => m.PackTypeModule)
      },
      {
        path: 'material',
        loadChildren: () => import('./lists/material/material.module').then(m => m.MaterialModule)
      },
      {
        path: 'analysis-type',
        loadChildren: () => import('./lists/analysis-type/analysis-type.module').then(m => m.AnalysisTypeModule)
      },
      {
        path: 'price',
        loadChildren: () => import('./lists/price/price.module').then(m => m.PriceModule)
      },
      {
        path: 'client',
        loadChildren: () => import('./lists/client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'btw',
        loadChildren: () => import('./lists/btw/btw.module').then(m => m.BtwModule)
      },
      {
        path: 'drying',
        loadChildren: () => import('./lists/party/party.module').then(m => m.PartyModule)
      },
      {
        path: 'trade',
        loadChildren: () => import('./lists/party/party.module').then(m => m.PartyModule)
      },
      {
        path: 'probe',
        loadChildren: () => import('./lists/probe/probe.module').then(m => m.ProbeModule)
      },
      {
        path: '',
        component: DashboardComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    canActivate: [NonAuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
