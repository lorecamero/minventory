import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalProductPage } from './modal-product';

@NgModule({
  declarations: [
    ModalProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalProductPage),
  ],
})
export class ModalProductPageModule {}
