import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { LoginUserService } from './services/login-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showLogout: Boolean;
  disableLogout: Boolean = false;
  loginState: string = 'Not Logged In';
  constructor(private router: Router, private loginUserService: LoginUserService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          if (this.router.url === '/privateView') {
            this.showLogout = true;
          } else {
            this.showLogout = false;
          }
        }
      });
    this.loginUserService.getData().subscribe(state => {
      this.loginState = state;
    });

  }

  logOut() {
    this.disableLogout = true;
    this.toastr.info('logging out from app ...');
    this.loginState = 'Logging Out';
    this.loginUserService.logIn(false).subscribe(() => {
      this.router.navigate(['/login']);
      this.disableLogout = false;
      this.loginState = 'Not Logged In';
    });
  }

}
