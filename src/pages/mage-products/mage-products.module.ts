import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MageProductsPage } from './mage-products';

@NgModule({
  declarations: [
    MageProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(MageProductsPage),
  ],
})
export class MageProductsPageModule {}
