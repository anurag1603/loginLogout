import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';

import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserService } from '../services/login-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.s\css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  canSubmit:Boolean = false;
  enableSubmit:Boolean = true;
  formErrors = {
    'username': '',
    'password': ''
  };
  
  constructor(private fb: FormBuilder , private router: Router , private loginUserService : LoginUserService , public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.createForm();
    this.toastr.setRootViewContainerRef(vcr);
   }

   createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required , Validators.pattern('^[^.,/^\\\\]+$')]],
      password: ['', [Validators.required , Validators.pattern('^[^.,/^\\\\]+$')]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid && this.enableSubmit) {
      this.loginForm.disable();
      this.toastr.info('waiting for you to login');
      this.enableSubmit = false;
      this.loginUserService.sendData('Logging In');
      this.loginUserService.getUsers().subscribe(users => {
        if (_.some(users , this.loginForm.value)) {
          this.loginUserService.sendData('Logged In');
          this.toastr.success('Logging you in', 'Success!');
          this.loginUserService.logIn(true).subscribe(()=> {
            this.router.navigate(['/privateView']);
          });
        } else {
          this.loginForm.enable();
          this.loginForm.reset({
            username: '',
            password: ''
          });
          this.loginUserService.sendData('Not Logged In');
          this.enableSubmit = true;
          this.toastr.error('Invalid username/password');
        }
      });
    }
  }

  revert() {
    this.router.navigate(['/home'])
  }

  ngOnInit() {
  }

}
