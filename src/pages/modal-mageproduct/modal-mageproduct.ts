import { Component } from '@angular/core';
import { IonicPage, NavParams,ViewController,LoadingController,AlertController, ToastController ,NavController,ModalController} from 'ionic-angular';
import {ProductServiceProvider} from '../../providers/product-service/product-service';
/**
 * Generated class for the ModalMageproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-mageproduct',
  templateUrl: 'modal-mageproduct.html',
})
export class ModalMageproductPage {
  public mageproduct: any;
  public loader: any;
  loading: any;
  private qty: any;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public ViewController: ViewController, 
    public navParams: NavParams,
    public ProductServiceProvider:ProductServiceProvider,
    public toastCtrl: ToastController
  ){
    this.mageproduct = navParams.get('product');
    this.qty = this.mageproduct.qty;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalMageproductPage');
  }

  closeMageModalProduct(){
    this.ViewController.dismiss();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }
  removeLoading() {
    this.loader.dismiss();
  }

  showAlert(product) {
    let alert = this.alertCtrl.create({
      title: product.name+'',
      subTitle: 'Updated stock successfully',
      buttons: ['OK']
    });
    alert.present();
  }



}
