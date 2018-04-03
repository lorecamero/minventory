import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProductsPage } from '../products/products';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab0Root = ProductsPage;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  

  constructor() {

  }
}
