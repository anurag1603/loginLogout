import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { LoginUserService } from '../services/login-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private loginUserService : LoginUserService) { 
  }

  ngOnInit() {

    this.loginUserService.getUsers().subscribe((users) => {
      console.log(users);
      if(_.isEmpty(users)) {
        // add the users in localstorage
        this.loginUserService.setUSers();
      }
    });
  }

}
