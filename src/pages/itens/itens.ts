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
  page: number = 0;
  size: number = 24;
  sort: string = "nome";
  direction: string = "ASC";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public itemService: ItemService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) { }

  ionViewWillEnter() {
    this.resetPage();
    this.clearItems();
    this.loadItems();
  }

  newItem() {
    this.navCtrl.push('NewItemPage');
  }

  deleteItem(itemId: string) {
    this.itemService.delete(itemId)
      .subscribe(() => this.ionViewWillEnter(),
        error => console.log(error));
  }

  editItem(item: ItemDTO) {
    this.navCtrl.push('EditItemPage', item);
  }

  clearItems() {
    this.itens = [];
  }

  resetPage() {
    this.page = 0;
  }

  loadItems() {
    const loader = this.presentLoading();
    this.itemService.findAllPageable(this.page, this.size, this.sort, this.direction)
      .subscribe(response => {
        this.itens = this.itens.concat(response['content']);
        loader.dismiss();
      },
        error => {
          console.log(error);
          loader.dismiss();
        });
  }

  viewItem(item: ItemDTO) {
    this.navCtrl.push('ViewItemPage', { item: item });
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

  presentLoading(): Loading {
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();

    return loader;
  }

  doRefresh(refresher) {
    this.resetPage();
    this.clearItems();
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
