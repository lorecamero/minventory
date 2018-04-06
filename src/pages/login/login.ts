import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth/auth-service';

import { ProductsPage } from '../products/products';
import { MageProductsPage } from '../mage-products/mage-products';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username: string;
  public password: string;
  public loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authServiceProvider: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(loginForm: NgForm){
    this.navCtrl.push(MageProductsPage);

    // this.loading = true;
    // this.authServiceProvider.login(loginForm.value.username, loginForm.value.password)
    //   .subscribe(
    //     data => {
    //       console.log('success');
    //       this.navCtrl.push(ProductsPage);
    //     },
    //     error => {
    //       console.log('error')
    //     });
  }

}
