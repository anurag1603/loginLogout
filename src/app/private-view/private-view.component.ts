import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { LoginUserService } from '../services/login-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-view',
  templateUrl: './private-view.component.html',
  styleUrls: ['./private-view.component.scss']
})
export class PrivateViewComponent implements OnInit {

  isLoading: Boolean;
  constructor(private loginUserService : LoginUserService , public toastr: ToastsManager, vcr: ViewContainerRef ,  private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.isLoading = true;
    this.loginUserService.isLoggedIn().subscribe((value)=>{
     if(value){
      this.isLoading = false;
      console.log('this is a correct user');
    } else {
     this.toastr.error('You are not a logged in user');
     this.router.navigate(['/login'])
    }
    });
  }

}
