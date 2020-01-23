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
  ) {}

  ionViewDidLoad() {
    this.itemService.findAll()
      .subscribe(response => this.itens = response,
      error => {});
  }

}
