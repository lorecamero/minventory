import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController,ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {ProductServiceProvider} from '../../providers/product-service/product-service';



@Component({
  selector: 'products',
  templateUrl: 'products.html',
  providers: [ProductServiceProvider]
})
export class ProductsPage {
    public products: any;
    public loader: any;

  constructor(private ModalController:ModalController,public navCtrl: NavController,public ProductServiceProvider: ProductServiceProvider,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
    this.loadProducts();
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
  
  openProductModal(product){
    const pModal = this.ModalController.create("ModalProductPage",{product: product});
    pModal.onDidDismiss(() => { this.loadProducts(); }); 
    pModal.present();
  }

  showAlert(product) {
    let alert = this.alertCtrl.create({
      title: product.name+' Product Added!',
      subTitle: ' product added!',
      buttons: ['OK']
    });
    alert.present();
  }

  loadProducts(){
    this.presentLoading();
    this.ProductServiceProvider.load()
    .then(data => {
      this.products = data;
      this.removeLoading();
      console.log(this.products);
    });
  }

  addProduct(productForm: NgForm){
    //console.log(productForm.value);

      this.ProductServiceProvider.addProduct(productForm.value)
        .then((product) => {
          this.loadProducts();
        });
  }
  

}