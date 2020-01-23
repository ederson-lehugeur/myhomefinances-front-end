import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';

/**
 * Generated class for the ItensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itens',
  templateUrl: 'itens.html',
})
export class ItensPage {

  itens: ItemDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.itens = [
      {
        id: "1",
        nome: "Teste",
        complemento: "Teste"
      }
    ]
  }

}
