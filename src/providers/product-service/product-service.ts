import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class ProductServiceProvider {
  data: any;
  product: any;
 
  constructor(public http: HttpClient) {
    this.data = null;
    this.product = null;
  }

  load() {
    if (this.data) {
      // already loaded data
      //return Promise.resolve(this.data);
    }
  
    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      // http://laposhshop.com:8100/api/get/products
      // http://supercopyoc.com/api/getproducts.php
      this.http.get('http://laposhshop.com:8100/api/get/products')
        .map(res => res)
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }


  addProduct(product) {
    this.product = product;

    let postParams = {
      key: 'lore',
      name: this.product.name,
      sku: this.product.sku,
      description: this.product.description,
      price: this.product.price,
      active: this.product.active
    }
/*
    let formDatas = new FormData();
    formDatas.append('key','lore');
    formDatas.append('sku',postParams.sku);
    formDatas.append('name',postParams.name);
    formDatas.append('description',postParams.description);
    formDatas.append('price',postParams.price);
    formDatas.append('active',postParams.active);
    */

   /* var url = "http://supercopyoc.com/api/addproduct.php?key="+postParams.key+"&name="+postParams.name+"&sku="+postParams.sku
    +"&description="+postParams.description+"&price="+postParams.price+"&active="+postParams.active;
    */
    this.http.post("http://laposhshop.com:8100/api/add/products", postParams)
    .subscribe(data => {
      console.log(data);
     }, error => {
      console.log(error);// Error getting the data
    });

  }


  updateProduct(product) {

    let postParams = {
      key: 'lore',
      _id: product._id,
      name: product.name,
      sku: product.sku,
      description: product.description,
      price: product.price,
      active: product.active
    }
/*
    let formDatas = new FormData();
    formDatas.append('key','lore');
    formDatas.append('_id',postParams._id);
    formDatas.append('sku',postParams.sku);
    formDatas.append('name',postParams.name);
    formDatas.append('description',postParams.description);
    formDatas.append('price',postParams.price);
    formDatas.append('active',postParams.active);
    */

   /* var url = "http://supercopyoc.com/api/addproduct.php?key="+postParams.key+"&name="+postParams.name+"&sku="+postParams.sku
    +"&description="+postParams.description+"&price="+postParams.price+"&active="+postParams.active;
    */
    this.http.post("http://supercopyoc.com/api/updateproduct.php", postParams)
    .subscribe(data => {
      console.log(data);
     }, error => {
      console.log(error);// Error getting the data
    });

  }

  deleteProduct(product) {
    /*
    let postParams = {
      key: 'lore',
      _id: product._id
    }
    let formDatas = new FormData();
    formDatas.append('key','lore');
    formDatas.append('id',postParams.id);
    */
    /*
    this.http.post("http://supercopyoc.com/api/deleteproduct.php", postParams)
    .subscribe(data => {
      console.log(data);
     }, error => {
      console.log(error);// Error getting the data
    });
    */
    
    this.http.delete('http://laposhshop.com:8100/api/delete/products/' + product._id)
    .subscribe(data => {
      console.log(data);
     }, error => {
      console.log(error);// Error getting the data
    });

  }

}
