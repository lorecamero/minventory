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
  private entity_id:any;
  private sku: any;
  private qty: any;
  private status: any;
  private is_in_stock: any;
  private backorders: any;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public ViewController: ViewController, 
    public navParams: NavParams,
    public ProductServiceProvider:ProductServiceProvider,
    public toastCtrl: ToastController
  ){
    this.mageproduct = navParams.get('product');
    this.entity_id = this.mageproduct.entity_id;
    this.qty = this.mageproduct.sku;
    this.qty = this.mageproduct.qty;
    this.status = this.mageproduct.status;
    this.is_in_stock = this.mageproduct.is_in_stock;
    this.backorders = this.mageproduct.backorders;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalMageproductPage');
  }

  updateMageProduct(){
    let mage = {
      key: 'lore',
      entity_id: this.entity_id,
      sku: this.sku,
      is_in_stock: this.is_in_stock,
      qty: this.qty,
      backorders: this.backorders,
      status: this.status 
    }
    this.presentLoading();

    this.ProductServiceProvider.updateMageProduct(mage)
    .then((mage) => {
    this.removeLoading();
     this.showAlert();
    });
    
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

  showAlert() {
    let alert = this.alertCtrl.create({
      title: this.mageproduct.name+'',
      subTitle: 'Updated stock successfully',
      buttons: ['OK']
    });
    alert.present();
  }



}
