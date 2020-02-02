import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';

@IonicPage()
@Component({
  selector: 'page-view-item',
  templateUrl: 'view-item.html',
})
export class ViewItemPage {

  item: ItemDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('item');
  }

}
