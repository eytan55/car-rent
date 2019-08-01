import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isloading = false;
  isLogin = true;
  form: FormGroup;

  constructor( 
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, { updateOn: 'blur', validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, { updateOn: 'blur', validators: [Validators.required]})
  });
  }

  authenticate(email: string, password: string) {
    this.isloading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Logging in...'})
    .then(loadingEl => {
      loadingEl.present();
      let authObs: Observable<AuthResponseData>;
      if (this.isLogin) {
        authObs = this.authService.login(email, password);
      } else {
        authObs = this.authService.signup(email, password);
      }
      authObs.subscribe(
      resData => {
        console.log(resData);
        this.isloading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/cars');
      },
      error => {
        loadingEl.dismiss();
        const code = error.error.error.message;
        let message = 'Could not sign you up, please try again';
        if (code === 'EMAIL_EXISTS') {
          message = 'This email adress exist already.';
        } else if (code === 'EMAIL_NOT_FOUND' ) {
          message = 'This email adress could not be found.';
        } else if (code === 'INVALID_PASSWORD' ) {
          message = 'This password is not correct.';
        } else if (code === 'INVALID_EMAIL' ) {
          message = 'This email is not correct.';
        } else if (code === 'WEAK_PASSWORD : Password should be at least 6 characters' ) {
          message = 'Password should be at least 6 characters.';
        }

        this.showAlert(message);
        console.error(error);
      });
    });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authenticate(email, password);
  }

  private showAlert(message: string) {
    this.alertCtrl.create({
      header: 'Authentication failed',
      message,
      buttons: ['OK']
    })
    .then(alertEl => {
        alertEl.present();
    });
  }

}
