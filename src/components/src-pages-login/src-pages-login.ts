import { Component } from '@angular/core';

/**
 * Generated class for the SrcPagesLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'src-pages-login',
  templateUrl: 'src-pages-login.html'
})
export class SrcPagesLoginComponent {

  text: string;

  constructor() {
    console.log('Hello SrcPagesLoginComponent Component');
    this.text = 'Hello World';
  }

}
