import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ModalController } from 'ionic-angular';
import {ProductServiceProvider} from '../../providers/product-service/product-service';

/**
 * Generated class for the MageProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mage-products',
  templateUrl: 'mage-products.html',
})
export class MageProductsPage {
  public loader: any;
  public mageproducts: any;
  private searchfilter: any;


  constructor(
    public navCtrl: NavController,
    public ProductServiceProvider:ProductServiceProvider,
     public navParams: NavParams,
     private ModalController:ModalController,
     public loadingCtrl: LoadingController
    ) {
      this.searchfilter = '';
      this.loadProducts('');
  }

  openMageProductModal(product){
    const pModal = this.ModalController.create("ModalMageproductPage",{product: product});
    pModal.onDidDismiss(() => { this.loadProducts(this.searchfilter); }); 
    pModal.present();
  }


  loadProducts(searchfilter){
    this.presentLoading();
    this.ProductServiceProvider.mageload(searchfilter)
    .then(data => {
      this.mageproducts = data;
      this.removeLoading();
      console.log(this.mageproducts);
    });
  }
 
  searchProducts(){
    this.loadProducts(this.searchfilter);
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
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MageProductsPage');
  }

}
