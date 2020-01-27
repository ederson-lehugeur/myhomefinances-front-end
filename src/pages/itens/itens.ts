import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';
import { ItemService } from '../../services/domain/item.service';

@IonicPage()
@Component({
  selector: 'page-itens',
  templateUrl: 'itens.html',
})
export class ItensPage {

  itens: ItemDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public itemService: ItemService
  ) { }

  ionViewWillEnter() {
    this.loadItens();
  }

  newItem() {
    this.navCtrl.push('NewItemPage');
  }

  deleteItem(itemId: string) {
    this.itemService.delete(itemId)
      .subscribe(() => this.loadItens());
  }

  editItem(item: ItemDTO) {
    this.navCtrl.push('EditItemPage', item);
  }

  loadItens() {
    this.itemService.findAll()
      .subscribe(response => this.itens = response,
        error => console.log(error));
  }

}
