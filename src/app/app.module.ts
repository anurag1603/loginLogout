import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalStorageModule } from '@ngx-pwa/local-storage';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginUserService } from './services/login-user.service';
import { PrivateViewComponent } from './private-view/private-view.component';
import { ToastOptions } from 'ng2-toastr/src/toast-options';


export class CustomOption extends ToastOptions {
  positionClass = 'toast-bottom-right';
  toastLife = 2000;
  showCloseButton = true;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PrivateViewComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    LocalStorageModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastModule.forRoot()
  ],
  providers: [LoginUserService ,
    {provide: ToastOptions, useClass: CustomOption}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
