import { ItemService } from './../../services/domain/item.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

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
      .subscribe(response => {
        this.categorias = response

        if (this.itemNavParamsIsDefined()) {
          this.loadFormGroup();
        }
      });
  }

  loadFormGroup() {
    this.formGroup.setValue({
      nome: this.navParams.get('nome'),
      complemento: this.navParams.get('complemento'),
      categoriaId: this.navParams.get('categoria').id
    });
  }

  itemNavParamsIsDefined(): Boolean {
    return this.navParams.get('id') != null ? true : false;
  }

  createItem() {
    this.itemService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      });
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
