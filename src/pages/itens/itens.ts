import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';
import { ItemService } from '../../services/domain/item.service';

@IonicPage()
@Component({
  selector: 'page-itens',
  templateUrl: 'itens.html',
})
export class ItensPage {

  itens: ItemDTO[] = [];
  itensPorCategoria = new Map();
  page: number = 0;
  itemsPerPage: number = 12;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public itemService: ItemService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
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

  /*clearItemsPerCategory() {
    this.itensPorCategoria.clear();
  }*/

  loadItems() {
    const loader = this.presentLoading();
    this.itemService.findAll(this.page, this.itemsPerPage)
      .subscribe(response => {
        this.itens = this.itens.concat(response['content']);
        console.log(this.page);
        console.log(this.itemsPerPage);
        console.log(this.itens);
        //this.clearItemsPerCategory();
        //this.itemsGroupByCategory();
        loader.dismiss();
      },
        error => {
          console.log(error);
          loader.dismiss();
        });
  }

  /*itemsGroupByCategory() {
    this.itens.map(item => {
      if (this.itensPorCategoria.has(item.categoria.nome)) {
        this.itensPorCategoria.get(item.categoria.nome).push(item);
      } else {
        this.itensPorCategoria.set(item.categoria.nome, [item]);
      }
    })
  }*/

  /*getValuesFromItemsGroupByCategoria(key: string): Array<ItemDTO> {
    return this.itensPorCategoria.get(key);
  }*/

  /*getKeysFromItemsGroupByCategoria(): Array<string> {
    return Array.from(this.itensPorCategoria.keys());
  }*/

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

  presentLoading(): Loading {
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();

    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.itens = [];
    this.loadItems();
    setTimeout(() => {
      refresher.complete();
    }, 500);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadItems();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }

}
