import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { Gatekeeper } from 'gatekeeper-client-sdk';

import { HttpClient } from '@angular/common/http';

import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public user: any;
  // profile!: ProfileType;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: MsalService) {
  }

  async loginByAuth({ email, password }) {
    // try {
    //   const token = await Gatekeeper.loginByAuth(email, password);
    //   localStorage.setItem('token', token);
    //   await this.getProfile();
    //   this.router.navigate(['/']);
    // } catch (error) {
    //   this.toastr.error(error.message);
    // }
  }

  async registerByAuth({ email, password }) {
    // try {
    //   const token = await Gatekeeper.registerByAuth(email, password);
    //   localStorage.setItem('token', token);
    //   await this.getProfile();
    //   this.router.navigate(['/']);
    // } catch (error) {
    //   this.toastr.error(error.message);
    // }
  }

  async loginByGoogle() {
    // try {
    //   const token = await Gatekeeper.loginByGoogle();
    //   localStorage.setItem('token', token);
    //   await this.getProfile();
    //   this.router.navigate(['/']);
    // } catch (error) {
    //   this.toastr.error(error.message);
    // }
  }

  async registerByGoogle() {
    // try {
    //   const token = await Gatekeeper.registerByGoogle();
    //   localStorage.setItem('token', token);
    //   await this.getProfile();
    //   this.router.navigate(['/']);
    // } catch (error) {
    //   this.toastr.error(error.message);
    // }
  }

  async loginByFacebook() {
    // try {
    //   const token = await Gatekeeper.loginByFacebook();
    //   localStorage.setItem('token', token);
    //   await this.getProfile();
    //   this.router.navigate(['/']);
    // } catch (error) {
    //   this.toastr.error(error.message);
    // }
  }

  async registerByFacebook() {
    // try {
    //   const token = await Gatekeeper.registerByFacebook();
    //   localStorage.setItem('token', token);
    //   await this.getProfile();
    //   this.router.navigate(['/']);
    // } catch (error) {
    //   this.toastr.error(error.message);
    // }
  }

  // getProfile2() {
  //   this.http.get(GRAPH_ENDPOINT)
  //     .subscribe(profile => {
  //       this.profile = profile;
  //       console.log('--PROFILE--');
  //       console.log(profile);
  //     });
  // }


  async getProfile() {

    // try {
    //   this.user = await Gatekeeper.getProfile();
    // } catch (error) {
    //   this.logout();
    //   throw error;
    // }

    // this.user = this.authService.instance.getActiveAccount();
    // if (this.user === null) {
    //   const currentAccounts = this.authService.instance.getAllAccounts();
    //   if (!currentAccounts || currentAccounts.length < 1) {
    //     return;
    //   } else if (currentAccounts.length === 1) {
    //     const activeAccount = currentAccounts[0];
    //     this.authService.instance.setActiveAccount(activeAccount);
    //     this.user = activeAccount;
    //   }
    // }
    // console.log(this.user);
  }

  logout() {
    // localStorage.removeItem('token');
    // localStorage.removeItem('gatekeeper_token');
    // this.user = null;
    // this.router.navigate(['/login']);

    this.authService.logout().subscribe(()=>{
      //localStorage.removeItem('token');
      //localStorage.removeItem('gatekeeper_token');
      this.user = null;
    });
  }
}
