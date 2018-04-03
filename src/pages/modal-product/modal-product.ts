import { Component } from '@angular/core';
import { IonicPage, NavParams,ViewController,LoadingController,AlertController, ToastController,Platform,ActionSheetController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {ProductServiceProvider} from '../../providers/product-service/product-service';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

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
    public toastCtrl: ToastController,
    private camera: Camera, 
    private transfer: Transfer, 
    private file: File, 
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform
  ) {
    console.log(navParams.get('product'));
    this.product = navParams.get('product');
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  console.log('1:'+namePath);
  console.log('2:'+currentName);
  console.log('3:'+newFileName);
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
    console.log('Error while storing file:'+error);
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

public uploadImage() {
  // Destination URL
  var url = "http://laposhshop.com:8100/api/uploadimage/products";
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  const fileTransfer: TransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
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
