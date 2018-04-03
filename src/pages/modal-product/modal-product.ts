import { Component } from '@angular/core';
import { IonicPage, NavParams,ViewController,LoadingController,AlertController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {ProductServiceProvider} from '../../providers/product-service/product-service';


/**
 * Generated class for the ModalProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-modal-product',
  templateUrl: 'modal-product.html',
  providers: [ProductServiceProvider]
})
export class ModalProductPage {
  public product: any;
  public loader: any;
  lastImage: string = null;
  loading: any;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public ViewController: ViewController, 
    public navParams: NavParams,
    public ProductServiceProvider:ProductServiceProvider,
    public toastCtrl: ToastController
  ) {
    console.log(navParams.get('product'));
    this.product = navParams.get('product');
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad ModalProductPage');
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
      subTitle: 'Updated successfully',
      buttons: ['OK']
    });
    alert.present();
  }
 

  showDeleteAlert(product) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Deletion',
      message: 'Do you want to delete '+product.name,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteProduct(product);
          }
        }
      ]
    });
    alert.present();
  }

  showUpdateAlert(updateProductForm: NgForm,name) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Update',
      message: 'Do you want to update '+name,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: () => {
            this.updateProduct(updateProductForm.value);
          }
        }
      ]
    });
    alert.present();
  }
/*
  updateProduct(updateProductForm: NgForm){
    this.presentLoading();
    console.log('value: '+updateProductForm.value);
    this.ProductServiceProvider.updateProduct(updateProductForm.value);
    this.removeLoading();
    this.showAlert(updateProductForm.value);
  }*/

  updateProduct(updateProductForm){
    this.presentLoading();
    console.log('value: '+updateProductForm);
      this.ProductServiceProvider.updateProduct(updateProductForm);
    this.removeLoading();
    this.showAlert(updateProductForm);

  }

  deleteProduct(product){
      this.ProductServiceProvider.deleteProduct(product)
        .then((product) => {
          this.closeModalProduct(); 
        });
    //test
  }

  closeModalProduct(){
    this.ViewController.dismiss();
  }

}
