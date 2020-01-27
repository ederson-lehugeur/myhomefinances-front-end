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
  itensPorCategoria = new Map();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public itemService: ItemService
  ) { }

  ionViewWillEnter() {
    this.loadItems();
  }

  newItem() {
    this.navCtrl.push('NewItemPage');
  }

  deleteItem(itemId: string) {
    this.itemService.delete(itemId)
      .subscribe(() => this.loadItems());
  }

  editItem(item: ItemDTO) {
    this.navCtrl.push('EditItemPage', item);
  }

  loadItems() {
    this.itemService.findAll()
      .subscribe(response => {
        this.itens = response;
        this.itensPorCategoria.clear();
        this.itemsGroupByCategoria();
      },
        error => console.log(error));
  }

  itemsGroupByCategoria() {
    this.itens.map(item => {
      if (this.itensPorCategoria.has(item.categoria.nome)) {
        this.itensPorCategoria.get(item.categoria.nome).push(item);
      } else {
        this.itensPorCategoria.set(item.categoria.nome, [item]);
      }
    })
  }

  getValuesFromItemsGroupByCategoria(key: string): Array<ItemDTO> {
    return this.itensPorCategoria.get(key);
  }

  getKeysFromItemsGroupByCategoria(): Array<string> {
    return Array.from(this.itensPorCategoria.keys());
  }

}
