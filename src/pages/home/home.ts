import { StorageService } from './../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    username: "",
    password: ""
  }

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public storage: StorageService
  ) { }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    if (this.storage.localUserIsDefined()) {
      this.auth.refreshToken()
        .subscribe(response => {
          this.auth.successfulLogin(response.headers.get('Authorization'))
          this.navCtrl.setRoot('RegistrosPage');
        },
          error => { });
    }
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'))
        this.navCtrl.setRoot('RegistrosPage');
      },
        error => { });
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
