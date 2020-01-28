import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
    public itemService: ItemService,
    public alertCtrl: AlertController
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

  showUpdateOk() {
    const alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Item atualizado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  showConfirmDeleteItem(itemId: string) {
    const confirm = this.alertCtrl.create({
      title: 'Atenção',
      message: 'Tem certeza que deseja excluir o item?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Ok',
          handler: () => {
            this.deleteItem(itemId);
          }
        }
      ]
    });
    confirm.present();
  }

}
