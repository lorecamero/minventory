import { Component } from '@angular/core';
import { IonicPage, NavParams,ViewController,LoadingController,AlertController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {ProductServiceProvider} from '../../providers/product-service/product-service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ModalProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-product',
  templateUrl: 'modal-product.html',
  providers: [ProductServiceProvider]
})
export class ModalProductPage {
  public product: any;
  public loader: any;
  public imageURI:any;
  public imageFileName:any;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public ViewController: ViewController, 
    public navParams: NavParams,
    public ProductServiceProvider:ProductServiceProvider,
    private transfer: FileTransfer,
    private camera: Camera,
    public toastCtrl: ToastController
  ) {
    console.log(navParams.get('product'));
    this.product = navParams.get('product');
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'upload_'+this.product._id,
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://laposhshop.com:8100/api/uploadimage/products', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://laposhshop.com/api/images/"+data;
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
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
      this.ProductServiceProvider.deleteProduct(product);
    this.closeModalProduct(); 
    //test
  }

  closeModalProduct(){
    this.ViewController.dismiss();
  }

}
