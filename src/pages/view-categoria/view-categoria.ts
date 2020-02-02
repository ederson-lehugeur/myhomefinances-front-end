import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../models/categoria.dto';

@IonicPage()
@Component({
  selector: 'page-view-categoria',
  templateUrl: 'view-categoria.html',
})
export class ViewCategoriaPage {

  categoria: CategoriaDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.categoria = this.navParams.get('categoria');
  }

}
