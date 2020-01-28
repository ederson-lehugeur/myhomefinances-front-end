import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaDTO } from '../../models/categoria.dto';
import { ItemService } from '../../services/domain/item.service';
import { CategoriaService } from '../../services/domain/categoria.service';

@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {

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
      id: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.maxLength(120)]],
      complemento: ['', [Validators.maxLength(120)]],
      categoriaId: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.categorias = response

        this.loadFormGroup();
      },
        error => console.log(error));
  }

  loadFormGroup() {
    this.formGroup.setValue({
      id: this.navParams.get('id'),
      nome: this.navParams.get('nome'),
      complemento: this.navParams.get('complemento'),
      categoriaId: this.navParams.get('categoria').id
    });
  }

  updateItem() {
    this.itemService.update(this.formGroup.value)
      .subscribe(() => this.showUpdateOk(),
        error => console.log(error));
  }

  showUpdateOk() {
    const alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Item atualizado com sucesso!',
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
