import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaDTO } from '../../models/categoria.dto';
import { ItemService } from '../../services/domain/item.service';
import { CategoriaService } from '../../services/domain/categoria.service';

@IonicPage()
@Component({
  selector: 'page-new-item',
  templateUrl: 'new-item.html',
})
export class NewItemPage {

  formGroup: FormGroup;
  categorias: CategoriaDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public itemService: ItemService,
    public categoriaService: CategoriaService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(120)]],
      complemento: ['', [Validators.maxLength(120)]],
      categoriaId: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(response => this.categorias = response,
        error => console.log(error));
  }

  createItem() {
    this.itemService.insert(this.formGroup.value)
      .subscribe(() => {
        this.showInsertOk();
      },
        error => console.log(error));
  }

  showInsertOk() {
    const alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Item cadastrado com sucesso',
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

}
